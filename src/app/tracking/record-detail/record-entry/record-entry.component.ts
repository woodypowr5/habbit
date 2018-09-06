import { Measurement } from '../../../shared/types/measurement.model';
import { Record } from '../../../shared/types/record.model';
import { Plan } from '../../../plan/plan.model';
import { map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Marker } from '../../../shared/types/marker.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatAccordion } from '@angular/material';

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
  @Input() activeDateChanged: Subject<void>;
  @Output() addModifyMeasurement: EventEmitter<Measurement> = new EventEmitter();
  private activeMarker: BehaviorSubject<Marker>;
  @ViewChild('accordion') accordion: MatAccordion;

  constructor() { }

  get measurements() {
    return this.getMeasurementsForMarkers();
  }

  ngOnInit() {
    this.activeMarker = new BehaviorSubject(this.myPlan.markers[0]);
    this.activeDateChanged.subscribe((() => {
      this.newActiveDate();
    }));
  }

  getMeasurementsForMarkers(): Measurement[] {
    const measurements: Measurement[] = [];
    console.log(this.record.measurements)
    for (let i = 0; i < this.myPlan.markers.length; i++) {
      this.record.measurements.filter(currentMeasurement => {
        if (currentMeasurement.markerName === this.myPlan.markers[i].name) {
          measurements[i] = currentMeasurement;
        }
      });
    }
    console.log(measurements)
    return measurements;
  }

  addOrModifyMeasurement(measurement: Measurement, panel): void {
    this.addModifyMeasurement.emit(measurement);
    this.closeExpansionPanel();
  }

  setActiveMarker(marker: Marker): void {
    this.activeMarker.next(marker);
  }

  newActiveDate(): void {
    this.closeExpansionPanel();
  }

  closeExpansionPanel(): void {
    this.accordion.closeAll();
  }
}
