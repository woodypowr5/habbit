import { DataSortingService } from '../../shared/services/data-sorting-service';
import { ChartOptions } from '../../shared/data/chartOptions';
import { Marker } from '../../shared/types/marker.model';
import { TooltipText } from '../../shared/data/tooltipText';
import { Constants } from '../../shared/data/constants';
import { Plan } from '../../plan/plan.model';
import { Datapoint } from '../../shared/types/datapoint.model';
import { Record } from '../../shared/types/record.model';
import { ChartDataService } from '../../shared/services/chart-data.service';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
import { LifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-trends-summary',
  templateUrl: './trends-summary.component.html',
  styleUrls: ['./trends-summary.component.css']
})
export class TrendsSummaryComponent implements OnInit {
  @Input() records: Record[];
  @Input() plan: Plan;
  private movingAveragePeriod = Constants.movingAveragePeriod;
  private showAdvanced = false;

  private seriesData: any = {
    raw: [],
    movingAverage: [],
    globalAverage: []
  };
  private filteredSeriesData: any = {
    range: [],
    boolean: [],
    scalar: []
  };
  private selectedTrendType = 'raw';
  // private seriesState: string[] = [];
  private seriesState = {
    boolean: [],
    scalar: [],
    range: []
  };
  private visibleSeries: Marker[] = [];
  private activeDatatype = 'range';
  private tooltipText = TooltipText.trends.summary;
  private displayText: any;
  private chartOptions = ChartOptions.trends.summary;
  private curve: any = Constants.chartCurveFunctions.summary.raw;
  private includeEmptyDays = false;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
   if (this.plan) {
      this.seriesState.range = [this.plan.markers[0].name];
      this.seriesData.raw = this.chartDataService.computeRawData(this.records, this.plan);
      this.seriesData.scalar = this.seriesData.raw;
      const dataCopy = this.chartDataService.transformBooleanData(this.seriesData.raw);
      this.seriesData.movingAverage = this.chartDataService.computeMovingAverage(dataCopy, this.movingAveragePeriod);
      this.seriesData.globalAverage = this.chartDataService.computeGlobalAverage(dataCopy);
      if (this.activeDatatype === 'range') {
        this.filteredSeriesData.range = this.chartDataService.filterDataBySeries([this.plan.markers[0]], this.seriesData.raw);
      } else if (this.activeDatatype === 'boolean') {
        this.filteredSeriesData.boolean = this.chartDataService.computeHeatmapSeries([this.plan.markers[0]], this.records, this.plan);
      } else if (this.activeDatatype === 'scalar') {
        this.filteredSeriesData.scalar = this.chartDataService.filterDataBySeries([this.plan.markers[0]], this.seriesData.scalar);
        console.log(this.seriesData.scalar)
      }
    }
  }

  recomputeData() {
    this.curve = Constants.chartCurveFunctions.summary[this.selectedTrendType];
    this.visibleSeries = this.computeVisibleSeries(this.seriesState);
    const dataCopy = this.chartDataService.transformBooleanData(this.seriesData.raw);
      this.seriesData.movingAverage = this.chartDataService.computeMovingAverage(dataCopy, this.movingAveragePeriod);
    if (this.activeDatatype === 'range' || this.activeDatatype === 'scalar') {
      this.filteredSeriesData[this.activeDatatype] = this.chartDataService.filterDataBySeries(
        this.visibleSeries,
        this.seriesData[this.selectedTrendType]
      );
    } else if (this.activeDatatype === 'boolean') {
      if (this.selectedTrendType === 'raw') {
        this.filteredSeriesData.boolean = this.chartDataService.computeHeatmapSeries(this.visibleSeries, this.records, this.plan);
      } else if (this.selectedTrendType === 'movingAverage' || this.selectedTrendType === 'globalAverage') {
        this.filteredSeriesData.boolean = this.chartDataService.filterDataBySeries(
          this.visibleSeries,
          this.seriesData[this.selectedTrendType]
        );
      }
    }
  }

  seriesVisibilityChanged(event): void {
    event.value.map(markerName => {
      this.plan.markers.map(marker => {
        if (marker.name ===  markerName) {
          if (marker.dataType !== this.activeDatatype) {
            this.activeDatatype = marker.dataType;
          }
        }
      });
    });
    this.recomputeData();
  }

  checkForNewDatatype(dataType: string): void {
    const newSeriesState = this.seriesState;
    if (this.activeDatatype !== dataType) {
      if (dataType !== 'range') {
        newSeriesState.range = [];
      }
      if (dataType !== 'boolean') {
        newSeriesState.boolean = [];
      }
      if (dataType !== 'scalar') {
        newSeriesState.scalar = [];
      }
    }
  }

  trendTypeChanged(event): void {
    this.recomputeData();
  }

  computeVisibleSeries(seriesState: any): Marker[] {
    const visibleSeries: Marker[] = [];
    seriesState.range.map(seriesName => {
      visibleSeries.push(this.getMarkerFromPlan(seriesName));
    });
    seriesState.boolean.map(seriesName => {
      visibleSeries.push(this.getMarkerFromPlan(seriesName));
    });
    seriesState.scalar.map(seriesName => {
      visibleSeries.push(this.getMarkerFromPlan(seriesName));
    });
    return visibleSeries;
  }

  getMarkerFromPlan(markerName: string): Marker {
    for (let i = 0; i < this.plan.markers.length; i++) {
      if (this.plan.markers[i].name === markerName) {
        return this.plan.markers[i];
      }
    }
    return null;
  }

  showAll(datatype: string): void {
    this.activeDatatype = datatype;
    const newSeriesState = {
      range: [],
      boolean: [],
      scalar: []
    };
    this.plan.markers.map(marker => {
      if (marker.dataType === datatype) {
        newSeriesState[datatype].push(marker.name);
      }
    });
    this.seriesState = newSeriesState;
    this.recomputeData();
  }

  hideAll(datatype: string): void {
    this.activeDatatype = datatype;
    const newSeriesState = {
      range: [],
      boolean: [],
      scalar: []
    };
    this.plan.markers.map(marker => {
      if (marker.dataType === datatype) {
        newSeriesState[datatype].push(marker.name);
      }
    });
    newSeriesState[datatype] = [];
    this.seriesState = newSeriesState;
    this.recomputeData();
  }

  increasePeriod(): void {
    this.movingAveragePeriod++;
    this.recomputeData();
  }

  decreasePeriod(): void {
    this.movingAveragePeriod--;
    if (this.movingAveragePeriod < 1) {
      this.movingAveragePeriod = 1;
    }
    this.recomputeData();
  }

  toggleShowAdvanced() {
    this.showAdvanced = !this.showAdvanced;
  }
}
