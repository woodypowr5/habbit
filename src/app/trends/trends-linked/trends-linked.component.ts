import { TooltipText } from './../../shared/data/tooltipText';
import { Constants } from '../../shared/data/constants';
import { Plan } from './../../plan/plan.model';
import { Datapoint } from './../../shared/types/datapoint.model';
import { Record } from './../../shared/types/record.model';
import { ChartDataService } from '../../shared/services/chart-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-trends-linked',
  templateUrl: './trends-linked.component.html',
  styleUrls: ['./trends-linked.component.css']
})
export class TrendsLinkedComponent implements OnInit {
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
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colorScheme = Constants.chartColorScheme;
  autoScale = true;
  showGridLines = true;

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
  }

  trendTypeChanged(event): void {

  }

  isDisabled(whichSeries: number, markerName: string) {
    if (whichSeries === 0 && this.visibleSeries[1] === markerName) {
      return true;
    }
    if (whichSeries === 1 && this.visibleSeries[0] === markerName) {
      return true;
    }
    return false;
  }
}
