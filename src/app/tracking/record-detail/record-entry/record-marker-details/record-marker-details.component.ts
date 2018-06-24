import { MarkerDetailService } from './../../../../shared/markerDetail.service';
import { Marker } from './../../../../shared/types/marker.model';
import { History } from './../../../../shared/types/history.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-record-marker-details',
  templateUrl: './record-marker-details.component.html',
  styleUrls: ['./record-marker-details.component.css']
})
export class RecordMarkerDetailsComponent implements OnInit {
  @Input() history: History;
  @Input() activeMarker: Marker;
  private daysWithMeasurements: number;
  private daysInHistory: number;
  private averageEntryValue: number;
  private entryStreak: number;
  private standardDeviation: number;
  private range: number;

  constructor(private markerDetailService: MarkerDetailService) { }

  ngOnInit() {

  }
}
