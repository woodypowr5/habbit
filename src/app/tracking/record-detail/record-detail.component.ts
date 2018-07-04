import { Subject } from 'rxjs';
import { History } from './../../shared/types/history.model';
import { Measurement } from './../../shared/types/measurement.model';
import { Record } from './../../shared/types/record.model';
import { TrackingService } from '../../shared/services/tracking.service';
import { EmptyPlan } from './../../plan/emptyPlan.class';
import { DateService } from '../../shared/services/date.service';
import { Plan } from './../../plan/plan.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EmptyRecord } from '../emptyRecord.class';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {
  @Input() record: Record = new EmptyRecord;
  @Input() myPlan: Plan = new EmptyPlan;
  @Input() activeDate: Date;
  @Input() history: History;
  @Input() activeDateChanged: Subject<void>;

  private recordEntryActive = false;

  constructor(private dateService: DateService, private trackingService: TrackingService) { }

  ngOnInit() {}

  setRecordEntryActive(newValue) {
    this.recordEntryActive = newValue;
  }

  addOrModifyMeasurement(measurement: Measurement) { // this needs to be refactored
    let newRecord: Record = this.record;
    if (measurement.value === undefined) {
      this.deleteMeasurement(newRecord, measurement.markerName);
    } else if (newRecord.date === null) {
      newRecord = {
        id: null,
        date: this.activeDate,
        measurements: [measurement]
      };
      return this.createRecord(newRecord);
    } else if (newRecord.measurements.length === 0) {
      newRecord.measurements.push(measurement);
    } else {
        const newMeasurements = newRecord.measurements.filter(currentMeasurement => {
          return currentMeasurement.markerName !== measurement.markerName;
        });
        newMeasurements.push(measurement);
        newRecord.measurements = newMeasurements;
    }
    return this.updateRecord(newRecord);
  }

  deleteMeasurement(record: Record, markerName: string): void {
    const newMeasurements: Measurement[] = record.measurements
      .filter(function (measurement) {
        return measurement.markerName !== markerName;
      }
    );
    record.measurements = newMeasurements;
    if (record.measurements.length == 0) {
      this.deleteRecord(record);
    } else {
      this.updateRecord(record);
    }
  }

  deleteRecord(record: Record): void {
    this.trackingService.deleteRecord(record);
  }

  updateRecord(record: Record): void {
    this.trackingService.updateRecord(record);
  }

  createRecord(record: Record): void {
    this.trackingService.addRecordtoHistory(record);
  }

}
