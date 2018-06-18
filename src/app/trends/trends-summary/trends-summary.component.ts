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
  private seriesData: any[];
  private filteredSeriesData: any[] = [];

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
    this.seriesData = this.chartDataService.createSeriesData(this.records, this.plan);
    this.filteredSeriesData = this.chartDataService.filterSeriesData([this.plan.markers[0].name], this.seriesData);
  }

  seriesVisibilityChanged(event): void {
    this.filteredSeriesData = this.chartDataService.filterSeriesData(event.value, this.seriesData);
  }

  trendTypeChanged(event): void {
    console.log(event);
  }
}
