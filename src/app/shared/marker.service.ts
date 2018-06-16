import { Marker } from './types/marker.model';
import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/subscription';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MarkerService {
  availableMarkers: Marker[] = [];
  availableMarkersChanged = new BehaviorSubject<Marker[]>(null);
  private markerSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore
  ) {
    this.fetchAvailableMarkers();
  }

  fetchAvailableMarkers() {
    this.markerSubscriptions.push(
      this.db
        .collection('availableMarkers')
        .valueChanges()
        .map(docArray => {
          return docArray;
        })
        .subscribe(
          (markers: Marker[]) => {
            this.availableMarkers = markers;
            this.availableMarkersChanged.next(this.availableMarkers);
          },
          error => {}
        )
    );
  }

  cancelSubscriptions() {
    this.markerSubscriptions.forEach(sub => sub.unsubscribe());
  }

}
