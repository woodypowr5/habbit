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
  private chartType = 'heatmap';
  private filteredSeriesData: any[] = [];
  private selectedTrendType = 'raw';
  private visibleSeries: string[] = [];
  private tooltipText = TooltipText.trends.summary;
  private displayText: any;

  // chart config
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yScaleMin = 1;
  yScaleMax = 5;
  showYAxisLabel = true;
  yAxisLabel = 'Logged Value';
  timeline = true;
  colorScheme = Constants.chartColorScheme;
  autoScale = true;
  curve = Constants.chartCurveFunctions.summary.raw;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    this.visibleSeries = [this.plan.markers[0].name];
    this.seriesData.raw = this.chartDataService.computeRawData(this.records, this.plan);
    this.seriesData.movingAverage = this.chartDataService.computeMovingAverage(this.seriesData.raw);
    this.seriesData.globalAverage = this.chartDataService.computeGlobalAverage(this.seriesData.raw);
    this.filteredSeriesData = this.chartDataService.filterDataBySeries([this.plan.markers[0].name], this.seriesData.raw);
  }

  seriesVisibilityChanged(event): void {
    this.curve = Constants.chartCurveFunctions.summary[this.selectedTrendType];
    this.filteredSeriesData = this.chartDataService.filterDataBySeries(this.visibleSeries, this.seriesData[this.selectedTrendType]);
  }

  trendTypeChanged(event): void {
    this.curve = Constants.chartCurveFunctions.summary[this.selectedTrendType];
    this.filteredSeriesData = this.chartDataService.filterDataBySeries(this.visibleSeries, this.seriesData[this.selectedTrendType]);
  }
}
