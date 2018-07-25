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
  private stuff: Observable<any> = new Observable();

  constructor(private db: AngularFirestore) {}

  fetchPlanByUserId(userId: string): void {
    this.userId = userId;
    const historyRef = this.db.collection('plans').doc(userId);
    this.stuff = historyRef.valueChanges();
    this.stuff.subscribe(data => {
      this.plan.markers = data.markers;
      this.planChanged.next(this.plan);
    });
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
    const path = `plans/${this.userId}`;
    const userDocument = this.db.doc<any>(path);
    userDocument.update(this.plan);
  }

  cancelSubscriptions(): void {
    this.planSubscriptions.forEach(sub => sub.unsubscribe());
  }

  createPlan(userId: string): void {
    this.db.collection('plans').doc(userId).set({markers: []});
  }
}
