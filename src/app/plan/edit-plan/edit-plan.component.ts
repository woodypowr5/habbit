import { CustomMarkerComponent } from './custom-marker/custom-marker.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MarkerService } from '../../shared/services/marker.service';
import { Marker } from '../../shared/types/marker.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Plan } from '../plan.model';
import { Overlay } from '../../../../node_modules/@angular/cdk/overlay';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit, OnChanges {
  @Input() availableMarkers: Marker[] = [];
  @Input() myPlan: Plan;
  @Input() markerAddedToPlan: Marker;
  @Input() markerRemovedFromPlan: Marker;
  @Output() markerAddedToPlanParent = new EventEmitter<Marker>();
  @Output() markerRemovedFromPlanParent = new EventEmitter<Marker>();
  dialogRef: MatDialogRef<CustomMarkerComponent>;
  private selectedMarkers: Marker[] = [];
  private inactiveMarkers: Marker[] = [];
  private markerCategories: string[] = [];
  private categorySelectForm = new FormControl();

  constructor(private markerService: MarkerService, private formBuilder: FormBuilder, public dialog: MatDialog, private overlay: Overlay) {}

  ngOnInit() {
    this.markerService.markerCategoriesChanged.subscribe(categories => {
      this.markerCategories = categories;
    });
  }

  ngOnChanges() {
    this.inactiveMarkers = this.availableMarkers.filter(marker => !this.isInPlan(marker));
  }

  isInPlan(marker: Marker): boolean {
    // if (this.myPlan !== null) {
      for (let index = 0; index < this.myPlan.markers.length; index++) {
        if (this.myPlan.markers[index].name === marker.name) {
          return true;
        }
      }
    // }
    return false;
  }

  addMarkerToPlan(marker: Marker): void {
    this.markerAddedToPlanParent.emit(marker);
  }

  removeMarkerFromPlan(marker: Marker): void {
    this.markerRemovedFromPlanParent.emit(marker);
  }

  getMarkersForCategory(inactiveMarkers: Marker[], category: string): Marker[] {
    return inactiveMarkers.filter(marker => marker.category === category);
  }

  scrollTo(elementId: string): void {
    const element: Element = document.getElementById(elementId);
    element.scrollIntoView();
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(CustomMarkerComponent, {
      data: {
        availableMarkers: this.availableMarkers,
        myPlan: this.myPlan
      },
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    const sub = this.dialogRef.componentInstance.closeDialog.subscribe(() => {
      this.dialog.closeAll();
    });
    // dialogRef.afterClosed().subscribe(() => {
    //   // unsubscribe onAdd
    // });
  }
}
