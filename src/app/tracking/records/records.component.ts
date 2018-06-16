import { Record } from './../../shared/types/record.model';
import { CalculationService } from './../../shared/calculation.service';
import { DateService } from './../../shared/date.service';
import { EmptyRecord } from './../emptyRecord.class';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  @Input() records;
  @Output() setNewActiveRecord: EventEmitter<Record> = new EventEmitter();
  @Output() setNewActiveDate: EventEmitter<Date> = new EventEmitter();
  private numVisibleRecords = Constants.numVisibleDailyRecords;
  private activeRecordIndex: number;
  private activeDate: Date;
  private activeId: string = null;

  constructor(
    private dateService: DateService,
    private calculationService: CalculationService
  ) {}

  ngOnInit() {
    this.setActiveDate(new Date());
    this.activeRecordIndex = this.calculationService.getMedianIndexFromLength(this.numVisibleRecords);
  }

  setActiveRecord(event, index): void {
    this.setActiveDate(event.date);
    const newActiveRecord = this.getRecordForDate(event.date);
    if (newActiveRecord) {
      this.setNewActiveRecord.emit(newActiveRecord);
    } else {
      this.setNewActiveRecord.emit(new EmptyRecord);
    }
    this.activeRecordIndex = index;
  }

  setActiveDate(date): void {
    this.activeDate = new Date(date + ', ' + new Date().getFullYear());
    this.setNewActiveDate.emit(this.activeDate);
  }

  getDateByIndex(index): moment.Moment {
    return moment(this.activeDate).add(index - this.calculationService.getMedianIndexFromLength(this.numVisibleRecords), 'days');
  }

  getRecordForDate(date): Record {
    const dateWithYear = moment(new Date(date + ', ' + new Date().getFullYear()));
    return this.queryRecordsByDate(dateWithYear);
  }

  getRecordForIndex(index): Record {
    const date = moment(this.activeDate).add(index - this.calculationService.getMedianIndexFromLength(this.numVisibleRecords), 'days');
    return this.queryRecordsByDate(date);
  }

  queryRecordsByDate(date): Record {
    const record = new EmptyRecord;
    const foundRecord = this.records.filter(currentRecord => {
      if (this.dateService.isSameDate(currentRecord.date, date)) {
          return currentRecord;
      }
    });
    if (foundRecord.length > 0) {
      return foundRecord[0];
    }

    return record;
  }

  setActiveId(id: string): void {
    this.activeId = id;
  }

}
