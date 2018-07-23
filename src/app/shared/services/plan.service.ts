import { Plan } from '../../plan/plan.model';
import { Marker } from '../types/marker.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class PlanService {
  private userId: string = null;
  private plan: Plan = {
    name: null,
    markers: []
  };
  planChanged = new BehaviorSubject<Plan>(null);
  private planSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  fetchPlanByUserId(userId: string): void {
    this.userId = userId;
    this.planSubscriptions.push(
      this.db
        .collection('plans')
        .valueChanges()
        .map(docArray => {
          return docArray;
        })
        .subscribe(
          (plan: Plan[]) => {
            if (plan.length > 0) {
              this.plan = plan[0];
              if (!plan[0].markers) {
                this.plan.markers = [];
              }
            }
            this.planChanged.next(plan[0]);
          },
          error => {}
        )
    );
  }

  addMarkerToPlan(marker: Marker): void {
    this.plan.markers.push(marker);
    this.updatePlan();
  }

  removeMarkerFromPlan(marker: Marker): void {
    this.plan.markers = this.plan.markers.filter(currentMarker => currentMarker.name !== marker.name );
    this.updatePlan();
  }

  updatePlan() {
    const planRef = this.db.collection('plans').doc(this.userId);
    planRef.update(this.plan);
    this.planChanged.next(this.plan);
  }

  cancelSubscriptions(): void {
    this.planSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
