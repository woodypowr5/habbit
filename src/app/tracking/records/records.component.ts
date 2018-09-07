import { Record } from '../../shared/types/record.model';
import { CalculationService } from '../../shared/services/calculation.service';
import { DateService } from '../../shared/services/date.service';
import { EmptyRecord } from '../emptyRecord.class';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Constants } from '../../shared/data/constants';

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
    const properDate = moment(event.date).toDate();
    this.setActiveDate(properDate);
    const newActiveRecord = this.getRecordForDate(event.date);
    if (newActiveRecord) {
      this.setNewActiveRecord.emit(newActiveRecord);
    } else {
      this.setNewActiveRecord.emit(new EmptyRecord);
    }
    this.activeRecordIndex = index;
  }

  setActiveDate(date: Date): void {
    this.activeDate = date;
    this.setNewActiveDate.emit(this.activeDate);
  }

  getDateByIndex(index: number): moment.Moment {
    return moment(this.activeDate).add(index - this.calculationService.getMedianIndexFromLength(this.numVisibleRecords), 'days');
  }

  getRecordForDate(date: Date): Record {
    const dateWithYear = moment(new Date(date));
    return this.queryRecordsByDate(dateWithYear);
  }

  getRecordForIndex(index: number): Record {
    const date = moment(this.activeDate).add(index - this.calculationService.getMedianIndexFromLength(this.numVisibleRecords), 'days');
    return this.queryRecordsByDate(date);
  }

  queryRecordsByDate(date): Record {
    let record: Record = {
      id: null,
      date: null,
      measurements: []
    };
    this.records.map(currentRecord => {
      if (this.dateService.isSameDate(currentRecord.date, date)) {
          record = currentRecord;
      }
    });
    return record;
  }

  setActiveId(id: string): void {
    this.activeId = id;
  }

}
