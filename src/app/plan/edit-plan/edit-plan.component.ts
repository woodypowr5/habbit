import { MarkerService } from './../../shared/services/marker.service';
import { Marker } from './../../shared/types/marker.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Plan } from './../plan.model';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit, OnChanges {
  private selectedMarkers: Marker[] = [];
  private inactiveMarkers: Marker[] = [];
  private markerCategories: string[] = [];
  // private categorySelectForm: FormControl;
  @Input() availableMarkers: Marker[] = [];
  @Input() myPlan: Plan;
  @Input() markerAddedToPlan;
  @Input() markerRemovedFromPlan;
  @Output() markerAddedToPlanParent = new EventEmitter<Marker>();
  @Output() markerRemovedFromPlanParent = new EventEmitter<Marker>();

  constructor(private markerService: MarkerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.markerService.markerCategoriesChanged.subscribe(categories => {
      this.markerCategories = categories;
    });
    // this.onCategorySelectFormChanges();
  }

  ngOnChanges() {
    this.inactiveMarkers = this.availableMarkers.filter(marker => !this.isInPlan(marker));
  }

  // onCategorySelectFormChanges(): void {
  //   this.categorySelectForm.valueChanges.subscribe(val => {
  //     console.log(val);
  //   });
  // }

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

  getMarkersForCategory(inactiveMarkers: Marker[], category: string): Marker[] {
    return inactiveMarkers.filter(marker => marker.category === category);
  }
}
