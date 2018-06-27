import { Constants } from './../../../../shared/constants';
import { MarkerDetailService } from './../../../../shared/markerDetail.service';
import { Marker } from './../../../../shared/types/marker.model';
import { History } from './../../../../shared/types/history.model';
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TrackingService } from '../../../tracking.service';
import { TooltipText } from '../../../../shared/components/tooltip/tooltipText';

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
  private results: any = {
    daysWithMeasurements: [],
    streaks: {
      currentStreak: 0,
      longestStreak: 0
    }
  };

  private chartOptions: any = {
    daysWithMeasurements: {
      scheme: Constants.chartColorScheme.daysWithMeasurements,
      showXAxis: false,
      showYAxis: false,
      gradient: false,
      showLegend: false,
      showXAxisLabel: false,
      showYAxisLabel: false,
      doughnut: true,
      arcWidth: 0.25
    },
    streaks: {
      scheme: Constants.chartColorScheme.streaks,
      min: 0,
      max: null,
      units: null,
      angleSpan: 240,
      startAngle: -120,
      showAxis: false,
      legend: false,
      viewDoughnut: [160, 160],
      viewGauge: [180, 180]
    }
  };

  constructor(private trackingService: TrackingService, private markerDetailService: MarkerDetailService) { }

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
    }
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
        'name': 'Entry',
        'value': this.currentStreak
      },
      {
        'name': 'No Entry',
        'value': this.longestStreak
      }
    ];
    this.chartOptions.streaks.valueFormatting = this.formatValue;
  }
}
