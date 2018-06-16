import { Marker } from './../../../shared/types/marker.model';
import { UIService } from './../../../shared/ui.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Plan } from './../../plan.model';

@Component({
  selector: 'app-edit-marker-card',
  templateUrl: './edit-marker-card.component.html',
  styleUrls: ['./edit-marker-card.component.css']
})
export class EditMarkerCardComponent implements OnInit, OnChanges {
  @Input() marker: Marker;
  @Input() myPlan: Plan;
  @Input() isInPlan: boolean;
  @Output() markerAddedToPlan = new EventEmitter<Marker>();
  @Output() markerRemovedFromPlan = new EventEmitter<Marker>();
  isLoading: boolean;

  constructor() {}

  ngOnInit() {
    this.isLoading = false;
  }

  ngOnChanges() {
    this.isLoading = this.marker.isLoading;
  }

  addMarkerToPlan(marker: Marker): void {
    this.isLoading = true;
    this.markerAddedToPlan.emit(marker);
  }
}
