import { Constants } from './../../../../shared/constants';
import { MarkerDetailService } from './../../../../shared/markerDetail.service';
import { Marker } from './../../../../shared/types/marker.model';
import { History } from './../../../../shared/types/history.model';
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-record-marker-details',
  templateUrl: './record-marker-details.component.html',
  styleUrls: ['./record-marker-details.component.css']
})
export class RecordMarkerDetailsComponent implements OnInit {
  @Input() history: History;
  @Input() activeMarker: BehaviorSubject<Marker>;
  private marker: Marker;
  private daysWithMeasurements: number;
  private daysInHistory: number;
  private averageEntryValue: number;
  private entryStreak: number;
  private standardDeviation: number;
  private range: number;
  private results: any = {
    daysWithMeasurements: []
  };

  private chartOptions: any = {
    daysWithMeasurements: {
      scheme: Constants.chartColorScheme.pieDoughnut,
      showXAxis: false,
      showYAxis: false,
      gradient: false,
      showLegend: false,
      showXAxisLabel: false,
      showYAxisLabel: false,
      doughnut: true,
      arcWidth: 0.25
    }
  };

  constructor(private markerDetailService: MarkerDetailService) { }

  ngOnInit() {
    this.activeMarker.subscribe( marker => {
      this.marker = marker;
      this.calculateMarkerDetails(this.marker);
    });
  }

  calculateMarkerDetails(marker: Marker) {
    this.daysInHistory = this.markerDetailService.computeDaysInHistory(this.history);
    this.daysWithMeasurements = this.markerDetailService.computeDaysWithMeasurements(this.marker.name, this.history);
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
  }
}
