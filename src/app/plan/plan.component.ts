import { Marker } from './../shared/types/marker.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { Subscriber, Subscription } from 'rxjs';
import { MarkerService } from '../shared/marker.service';
import { PlanService } from './plan.service';
import { Plan } from './plan.model';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  private myPlan: Plan;
  private availableMarkers: Marker[] = [];
  private availableMarkerSubscription: Subscription;
  @Input() markerAddedToPlanParent;
  @Input() markerRemovedFromPlanParent;

  constructor(
    private markerService: MarkerService,
    private planService: PlanService
  ) {}

  ngOnInit() {
    this.fetchMyPlan();
    this.fetchAvailableMarkers();
  }

  fetchMyPlan(): void {
    this.planService.planChanged.subscribe(
      plan => this.myPlan = plan
    );
  }

  fetchAvailableMarkers(): void {
    this.availableMarkerSubscription = this.markerService.availableMarkersChanged.subscribe(
      markers => {
        if (markers !== null) {
          this.availableMarkers = markers;
        }
    });
  }

  addMarkerToPlan(marker): void {
    marker.isLoading = false;
    this.planService.addMarkerToPlan(marker);
  }

  removeMarkerFromPlan(marker): void {
    marker.isLoading = false;
    this.planService.removeMarkerFromPlan(marker);
  }

}
