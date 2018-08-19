import { PopoverText } from '../../../../shared/data/popoverText';
import { ChartDataService } from '../../../../shared/services/chart-data.service';
import { Constants } from '../../../../shared/data/constants';
import { ChartOptions } from '../../../../shared/data/chartOptions';
import { MarkerDetailService } from '../../../../shared/services/markerDetail.service';
import { Marker } from '../../../../shared/types/marker.model';
import { History } from '../../../../shared/types/history.model';
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TrackingService } from '../../../../shared/services/tracking.service';
import { TooltipText } from '../../../../shared/data/tooltipText';

@Component({
  selector: 'app-record-marker-details',
  templateUrl: './record-marker-details.component.html',
  styleUrls: ['./record-marker-details.component.css']
})
export class RecordMarkerDetailsComponent implements OnInit {
  @Input() activeMarker: BehaviorSubject<Marker>;
  private history: History;
  private historySubscription: Subscription;
  private marker: Marker;
  private daysWithMeasurements: number;
  private daysInHistory: number;
  private averageEntryValue: number;
  private currentStreak = 0;
  private longestStreak = 0;
  private standardDeviation: number;
  private range: number;
  private tooltipText = TooltipText.tracking.markerDetails;
  private popoverText = PopoverText.tracking.markerDetails;
  private chartOptions = ChartOptions;
  private results: any = {
    daysWithMeasurements: [],
    streaks: {
      currentStreak: 0,
      longestStreak: 0
    },
    performance: {
      boolean: null,
      range: null,
      scalar: null,
      bar: null,
      average: null,
      variability: null
    }
  };

  constructor(
    private trackingService: TrackingService,
    private markerDetailService: MarkerDetailService,
    private chartDataService: ChartDataService
  ) { }

  ngOnInit() {
    this.activeMarker.subscribe( marker => {
      this.marker = marker;
      this.calculateMarkerDetails(this.marker);
    });
    this.historySubscription = this.trackingService.historyChanged.subscribe(history => {
      this.history = history;
      this.calculateMarkerDetails(this.marker);
    });
  }

  formatValue(value) {
    let daysToGo;
    if (this.longestStreak) {
      daysToGo = value - value + this.longestStreak - this.currentStreak;
    } else {
      return '';
    }
    if (daysToGo < 1) {
      return 'Great Job!';
    } else if (daysToGo === 1) {
      return '1 day to go!';
    } else {
      return daysToGo + ' days to go!';
    }
  }

  calculateMarkerDetails(marker: Marker) {
    if (this.history) {
      this.daysInHistory = this.markerDetailService.computeDaysInHistory(this.history);
      this.daysWithMeasurements = this.markerDetailService.computeDaysWithMeasurements(this.marker.name, this.history);
      this.averageEntryValue = this.markerDetailService.computeAverageEntryValue(this.marker.name, this.history);
      this.longestStreak = this.markerDetailService.computeLongestStreak(this.marker.name, this.history);
      this.currentStreak = this.markerDetailService.computeCurrentStreak(this.marker.name, this.history);
      if (marker.dataType === 'boolean') {
        this.results.performance.boolean = this.chartDataService.computeBooleanBarData(this.marker.name, this.history);
      } else if (marker.dataType === 'range') {
        this.results.performance.range = this.chartDataService.computeProbabilityDistribution(this.marker, this.history);
        this.results.performance.bar = this.chartDataService.computeRangeBarData(this.marker, this.history);
      } else if (marker.dataType === 'scalar') {}
      this.standardDeviation = this.markerDetailService.computeStandardDeviation(this.marker.name, this.history, this.averageEntryValue);
      this.results.performance.average = [
        {
          name: 'Average',
          value: this.averageEntryValue
        }
      ];
      this.results.performance.variability = [
        {
          name: 'Variability',
          value: this.standardDeviation
        }
      ];

    // for chart display
    this.results.daysWithMeasurements = [
      {
        'name': 'Entry',
        'value': this.daysWithMeasurements
      },
      {
        'name': 'No Entry',
        'value': this.daysInHistory - this.daysWithMeasurements
      }
    ];
    this.results.streaks = [
      {
        'name': 'Current Streak',
        'value': this.currentStreak
      },
      {
        'name': 'Days Left',
        'value': this.longestStreak - this.currentStreak
      }
    ];
    this.chartOptions.streaks.valueFormatting = this.formatValue;
  }

}
