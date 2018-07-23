import { Marker } from '../../../shared/types/marker.model';
import { Record } from '../../../shared/types/record.model';
import { Plan } from '../../../plan/plan.model';
import { TooltipText } from '../../../shared/data/tooltipText';
import { ChartOptions } from '../../../shared/data/chartOptions';
import { ChartDataService } from '../../../shared/services/chart-data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  @Input() records: Record[];
  @Input() plan: Plan;
  private seriesData: any = {
    simpleComparison: {},
    correlationProfile: {},
    bayesianAnalysis: {}
  };
  private filteredSeriesData: any = {};
  private selectedTrendType = 'simpleComparison';
  private visibleSeries: string[] = [];
  private tooltipText = TooltipText.trends.links;

  // chart config
  private chartOptions = ChartOptions.trends.linked;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    if (this.plan.markers.length > 1) {
      this.visibleSeries = [this.plan.markers[0].name, this.plan.markers[1].name];
      this.seriesData.simpleComparison = this.chartDataService.computeScatterSeries(
        this.records,
        [this.visibleSeries[0], this.visibleSeries[1]]
      );
    }
    this.filteredSeriesData = this.seriesData[this.selectedTrendType];
    this.seriesVisibilityChanged();
  }

  seriesVisibilityChanged(): void {
    this.seriesData.simpleComparison = this.chartDataService.computeScatterSeries(
      this.records,
      [this.visibleSeries[0], this.visibleSeries[1]]
    );
    this.filteredSeriesData = this.seriesData[this.selectedTrendType];
    this.setChartAxes(this.visibleSeries, this.plan);
  }

  trendTypeChanged(event): void {

  }

  isDisabled(whichSeries: number, markerName: string): boolean {
    if (whichSeries === 0 && this.visibleSeries[1] === markerName) {
      return true;
    }
    if (whichSeries === 1 && this.visibleSeries[0] === markerName) {
      return true;
    }
    return false;
  }

  setChartAxes(visibleSeries: string[], plan: Plan): void {
    if (visibleSeries.length > 1) {
      const marker1: Marker = plan.markers.filter(marker => marker.name === visibleSeries[0])[0];
      const marker2: Marker = plan.markers.filter(marker => marker.name === visibleSeries[1])[0];
      this.chartOptions.xScaleMin = marker1.min - 1;
      this.chartOptions.xScaleMax = marker1.max + 1;
      this.chartOptions.yScaleMin = marker2.min - 1;
      this.chartOptions.yScaleMax = marker2.max + 1;
    }
  }
}
