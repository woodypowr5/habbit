import { Record } from './../../../shared/types/record.model';
import { TrackingDay } from './../../../shared/types/trackingDay.model';
import { EmptyRecord } from './../../emptyRecord.class';
import { AdjustedDatePipe } from './../adjustedDate.pipe';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input() isRecord;
  @Input() record;
  @Input() index;
  @Input() date;
  @Output() newActiveRecord: EventEmitter<TrackingDay> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  setActiveDate(record: Record, index: number, date: Date): void {
    const today: TrackingDay = {
      id: record.id,
      date: date,
      record: new EmptyRecord
    };
    if (record) {
      today.record = record;
    }
    this.newActiveRecord.emit(today);
  }

  recordExistsForDay(): boolean {
    if (this.record) {
      return (this.record.measurements.length > 0);
    }
    return false;
  }
}
