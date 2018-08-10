import { TrackingService } from './../shared/services/tracking.service';
import { Marker } from '../shared/types/marker.model';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarkerService } from '../shared/services/marker.service';
import { PlanService } from '../shared/services/plan.service';
import { Plan } from './plan.model';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  @Input() markerAddedToPlanParent: Marker;
  @Input() markerRemovedFromPlanParent: Marker;
  private myPlan: Plan = {
    name: '',
    markers: []
  };
  private availableMarkers: Marker[] = [];
  private availableMarkerSubscription: Subscription;


  constructor(
    private trackingService: TrackingService,
    private markerService: MarkerService,
    private planService: PlanService
  ) {}

  ngOnInit() {
    this.fetchMyPlan();
    this.fetchAvailableMarkers();
  }

  fetchMyPlan(): void {
    this.planService.planChanged.subscribe(
      plan => {
        this.myPlan = plan;
      }
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
    this.planService.addMarkerToPlan(marker);
  }

  removeMarkerFromPlan(marker): void {
    this.planService.removeMarkerFromPlan(marker);
    this.trackingService.deleteAllMarkerMeasurements(marker);
  }
}
