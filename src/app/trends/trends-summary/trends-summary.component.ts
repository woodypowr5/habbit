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
  private filteredSeriesData: any[] = [];
  private selectedTrendType = 'raw';
  private visibleSeries: string[] = [];

  // chart config
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  // yAxisLabel = 'Color Value';
  timeline = true;
  colorScheme = Constants.chartColorScheme;
  autoScale = true;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    this.seriesData.raw = this.chartDataService.computeRawData(this.records, this.plan);
    this.seriesData.movingAverage = this.chartDataService.computeMovingAverage(this.seriesData.raw);
    this.seriesData.globalAverage = this.chartDataService.computeGlobalAverage(this.seriesData.raw);
    this.filteredSeriesData = this.chartDataService.filterDataBySeries([this.plan.markers[0].name], this.seriesData.raw);
  }

  seriesVisibilityChanged(event): void {
    this.visibleSeries = event.value;
    this.filteredSeriesData = this.chartDataService.filterDataBySeries(this.visibleSeries, this.seriesData[this.selectedTrendType]);
  }

  trendTypeChanged(event): void {
    this.selectedTrendType = event.value;
    this.filteredSeriesData = this.chartDataService.filterDataBySeries(this.visibleSeries, this.seriesData[this.selectedTrendType]);
  }
}
