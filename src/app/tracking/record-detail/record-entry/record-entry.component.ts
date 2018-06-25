import { Measurement } from './../../../shared/types/measurement.model';
import { Record } from './../../../shared/types/record.model';
import { Plan } from './../../../plan/plan.model';
import { map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Marker } from '../../../shared/types/marker.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-record-entry',
  templateUrl: './record-entry.component.html',
  styleUrls: ['./record-entry.component.css']
})
export class RecordEntryComponent implements OnInit {
  @Input() record: Record;
  @Input() myPlan: Plan;
  @Input() activeDate: Date;
  @Input() history: History;
  @Output() addModifyMeasurement: EventEmitter<Measurement> = new EventEmitter();
  private activeMarker: BehaviorSubject<Marker>;

  constructor() { }

  ngOnInit() {
    this.activeMarker = new BehaviorSubject(this.myPlan.markers[0]);
  }

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

  setActiveMarker(marker: Marker): void {
    this.activeMarker.next(marker);
  }
}
