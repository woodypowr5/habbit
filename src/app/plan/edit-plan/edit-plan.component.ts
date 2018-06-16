import { Marker } from './../../shared/types/marker.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plan } from './../plan.model';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit, OnChanges {
  private selectedMarkers: Marker[] = [];
  private inactiveMarkers: Marker[] = [];
  @Input() availableMarkers: Marker[] = [];
  @Input() myPlan: Plan;
  @Input() markerAddedToPlan;
  @Input() markerRemovedFromPlan;

  @Output() markerAddedToPlanParent = new EventEmitter<Marker>();
  @Output() markerRemovedFromPlanParent = new EventEmitter<Marker>();

  ngOnInit() {
  }

  ngOnChanges() {
    this.inactiveMarkers = this.availableMarkers.filter(marker => !this.isInPlan(marker));
  }

  isInPlan(marker: Marker): boolean {
    for (let index = 0; index < this.myPlan.markers.length; index++) {
      if (this.myPlan.markers[index].name === marker.name) {
        return true;
      }
    }
    return false;
  }

  addMarkerToPlan(marker: Marker): void {
    this.markerAddedToPlanParent.emit(marker);
  }

  removeMarkerFromPlan(marker: Marker): void {
    this.markerRemovedFromPlanParent.emit(marker);
  }
}
