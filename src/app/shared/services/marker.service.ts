import { Marker } from '../types/marker.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/subscription';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MarkerService {
  private availableMarkers: Marker[] = [];
  public availableMarkersChanged = new BehaviorSubject<Marker[]>(null);
  private markerSubscriptions: Subscription[] = [];
  public markerCategoriesChanged = new BehaviorSubject<string[]>(null);
  private markerCategoriesSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore
  ) {
    this.fetchAvailableMarkers();
  }

  fetchAvailableMarkers(): void {
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
            this.hydrateCategories(this.availableMarkers);
          },
          error => {}
        )
    );
  }

  cancelSubscriptions(): void {
    this.markerSubscriptions.forEach(sub => sub.unsubscribe());
    this.markerCategoriesSubscriptions.forEach(sub => sub.unsubscribe());
  }

  hydrateCategories(markers: Marker[]): void {
    const categories: string[] = [];
    markers.map(marker => {
      if (categories.indexOf(marker.category) === -1) {
        categories.push(marker.category);
      }
    });
    this.markerCategoriesChanged.next(categories);
  }
}
