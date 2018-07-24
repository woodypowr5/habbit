import { ChartOptions } from '../../shared/data/chartOptions';
import { Marker } from '../../shared/types/marker.model';
import { TooltipText } from '../../shared/data/tooltipText';
import { Constants } from '../../shared/data/constants';
import { Plan } from '../../plan/plan.model';
import { Datapoint } from '../../shared/types/datapoint.model';
import { Record } from '../../shared/types/record.model';
import { ChartDataService } from '../../shared/services/chart-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';

@Component({
  selector: 'app-trends-summary',
  templateUrl: './trends-summary.component.html',
  styleUrls: ['./trends-summary.component.css']
})
export class TrendsSummaryComponent implements OnInit {
  @Input() records: Record[];
  @Input() plan: Plan;
  private seriesData: any = {
    raw: [],
    movingAverage: [],
    globalAverage: []
  };
  private filteredSeriesData: any = {
    range: [],
    boolean: []
  };
  private selectedTrendType = 'raw';
  private seriesState: string[] = [];
  private visibleSeries: Marker[] = [];
  private activeDatatype = 'range';
  private tooltipText = TooltipText.trends.summary;
  private displayText: any;
  private chartOptions = ChartOptions.trends.summary;
  private curve: any = Constants.chartCurveFunctions.summary.raw;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    if (this.plan) {
      this.seriesState = [this.plan.markers[0].name];
      this.seriesData.raw = this.chartDataService.computeRawData(this.records, this.plan);
      this.seriesData.movingAverage = this.chartDataService.computeMovingAverage(this.seriesData.raw);
      this.seriesData.globalAverage = this.chartDataService.computeGlobalAverage(this.seriesData.raw);
      if (this.activeDatatype === 'range') {
        this.filteredSeriesData.range = this.chartDataService.filterDataBySeries([this.plan.markers[0]], this.seriesData.raw);
      } else if (this.activeDatatype === 'boolean') {
        this.filteredSeriesData.boolean = this.chartDataService.computeHeatmapSeries([this.plan.markers[0]], this.records, this.plan);
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

  checkForNewDatatype(marker: Marker): void {
    if (this.activeDatatype !== marker.dataType) {
      this.seriesState = [];
    }
  }

  trendTypeChanged(event): void {
    this.recomputeData();
  }

  recomputeData() {
    this.curve = Constants.chartCurveFunctions.summary[this.selectedTrendType];
    this.visibleSeries = this.computeVisibleSeries(this.seriesState);
    if (this.activeDatatype === 'range') {
      this.filteredSeriesData.range = this.chartDataService.filterDataBySeries(this.visibleSeries, this.seriesData[this.selectedTrendType]);
    }  else if (this.activeDatatype === 'boolean') {
      this.filteredSeriesData.boolean = this.chartDataService.computeHeatmapSeries(this.visibleSeries, this.records, this.plan);
    }
  }

  computeVisibleSeries(seriesState: string[]): Marker[] {
    const visibleSeries: Marker[] = [];
    seriesState.map(seriesName => {
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
}
