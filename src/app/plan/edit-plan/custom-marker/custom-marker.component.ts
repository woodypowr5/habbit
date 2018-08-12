import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Plan } from './../../plan.model';
import { PlanService } from './../../../shared/services/plan.service';
import { Marker } from './../../../shared/types/marker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-marker',
  templateUrl: './custom-marker.component.html',
  styleUrls: ['./custom-marker.component.css']
})
export class CustomMarkerComponent implements OnInit {
  @Input() plan: Plan;
  @Output() closeDialog: EventEmitter<null> = new EventEmitter();
  private activeDatatype = 'scalar';
  private minLabel: string;
  private maxLabel: string;
  private unit: string;
  private customForm: FormGroup;
  private data: any;

  constructor(
    private planService: PlanService,
    private dialogRef: MatDialogRef<CustomMarkerComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.data = data;
      this.customForm = new FormGroup({
        'name': new FormControl(null, [Validators.required, this.nameTaken.bind(this)]),
        'minLabel': new FormControl(null),
        'maxLabel': new FormControl(null),
        'unit': new FormControl(null)
      });
    }

  ngOnInit() {
  }

  setActiveDatatype(datatype: string): void {
    this.activeDatatype = datatype;
  }

  onSubmit(): void {
    const newMarker: Marker = {
      name: this.customForm.get('name').value,
      dataType: this.activeDatatype,
      category: null,
      iconName: null,
      min: 1,
      max: 10,
      isLoading: false,
      minLabel: this.customForm.get('minLabel').value,
      maxLabel: this.customForm.get('maxLabel').value,
      delta: 1,
      value1Name: 'Yes',
      value2Name: 'No'
    };
    this.planService.addMarkerToPlan(newMarker);
    this.closeDialog.emit();
  }

  nameTaken(controls: FormControl): {[s: string]: boolean} {
    if (controls.value !== null && controls.value !== '') {
      for (let i = 0; i < this.data.myPlan.markers.length; i++) {
        const marker = this.data.myPlan.markers[i];
        if (marker.name.toLowerCase() === controls.value.toLowerCase()) {
          return {'taken': true};
        }
      }
    }
    return null;
  }
}
