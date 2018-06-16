import { Measurement } from './../../../shared/types/measurement.model';
import { Record } from './../../../shared/types/record.model';
import { Plan } from './../../../plan/plan.model';
import { map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-record-entry',
  templateUrl: './record-entry.component.html',
  styleUrls: ['./record-entry.component.css']
})
export class RecordEntryComponent implements OnInit {
  @Input() record: Record;
  @Input() myPlan: Plan;
  @Input() activeDate: Date;
  @Output() addModifyMeasurement: EventEmitter<Measurement> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  get measurements() {
    return this.getMeasurementsForMarkers();
  }

  getMeasurementsForMarkers() {
    const measurements: Measurement[] = [];
    for (let i = 0; i < this.myPlan.markers.length; i++) {
      this.record.measurements.filter(currentMeasurement => {
        if (currentMeasurement.markerName === this.myPlan.markers[i].name) {
          measurements[i] = currentMeasurement;
        }
      });
    }
    return measurements;
  }

  addOrModifyMeasurement(measurement: Measurement): void {
    this.addModifyMeasurement.emit(measurement);
  }
}
