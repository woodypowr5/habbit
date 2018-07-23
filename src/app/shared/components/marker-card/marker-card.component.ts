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
  @Input() active: boolean;
  @Input() hoverable: boolean;
  @Output() markerRemovedFromPlan = new EventEmitter<Marker>();
  @Output() markerClicked: EventEmitter<Marker> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  markerCardClicked(event) {
    this.markerClicked.emit(event);
  }
}
