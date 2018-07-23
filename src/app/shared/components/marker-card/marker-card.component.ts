import { Plan } from './../../../plan/plan.model';
import { Marker } from './../../../shared/types/marker.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-marker-card',
  templateUrl: './marker-card.component.html',
  styleUrls: ['./marker-card.component.css']
})
export class MarkerCardComponent implements OnInit {
  @Input() marker: Marker;
  @Input() myPlan: Plan;
  @Input() isInPlan: boolean;
  @Output() markerAddedToPlan = new EventEmitter<Marker>();
  @Output() markerRemovedFromPlan = new EventEmitter<Marker>();

  constructor() { }

  ngOnInit() { }

  addMarkerToPlan(marker: Marker): void {
    this.markerAddedToPlan.emit(marker);
  }
}
