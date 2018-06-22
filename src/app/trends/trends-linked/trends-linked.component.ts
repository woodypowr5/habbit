import { TooltipText } from './../../shared/components/tooltip/tooltipText';
import { Constants } from './../../shared/constants';
import { Plan } from './../../plan/plan.model';
import { Datapoint } from './../../shared/types/datapoint.model';
import { Record } from './../../shared/types/record.model';
import { ChartDataService } from './../chart-data.service';
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
  yScaleMin = 1000;
  yScaleMax = 5000;
  xScaleMin = 1000;
  xScaleMax = 5000;
  showYAxisLabel = true;
  colorScheme = Constants.chartColorScheme;
  autoScale = true;

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
  }

  seriesVisibilityChanged(event): void {
    if (event.value.length > 2) {
      event.value.shift();
    }
    this.visibleSeries = event.value;
    this.seriesData.simpleComparison = this.chartDataService.computeScatterSeries(
      this.records,
      [this.visibleSeries[0], this.visibleSeries[1]]
    );
    this.filteredSeriesData = this.seriesData[this.selectedTrendType];
  }

  trendTypeChanged(event): void {
  }
}
