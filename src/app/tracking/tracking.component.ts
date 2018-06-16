import { Record } from './../shared/types/record.model';
import { History } from './../shared/types/history.model';
import { DateService } from './../shared/date.service';
import { EmptyRecord } from './emptyRecord.class';
import { RecordsComponent } from './records/records.component';
import { PlanService } from './../plan/plan.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TrackingService } from './tracking.service';
import * as moment from 'moment';
import { Plan } from '../plan/plan.model';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {
  private activeRecord: Record = new EmptyRecord;
  private mockRecord: Record = {
    id: null,
    date: new Date(),
    measurements: []
  };
  private history: History;
  private historySubscription: Subscription;
  private myPlan: Plan;
  private planSubscription: Subscription;
  private activeDate;
  constructor(
    private trackingService: TrackingService,
    private planService: PlanService,
    private dateService: DateService) {
  }
  private activeId: number = null;

  ngOnInit() {
    this.historySubscription = this.trackingService.historyChanged.subscribe(history => {
      this.history = history;
      this.activeRecord = this.getRecordForDate(this.history.records, this.activeDate);
    });
    this.planService.planChanged.subscribe(plan =>
       this.myPlan = plan
    );
  }

  ngOnDestroy() {
    this.historySubscription.unsubscribe();
  }

  getRecordForDate(records, date): Record {
    const indexDate = moment(new Date(date + ', ' + new Date().getFullYear()));
    return this.queryRecordsByDate(records, indexDate);
  }

  queryRecordsByDate(records: Record[], date: moment.Moment): Record {
      const record = new EmptyRecord;
      const foundRecord = records.filter(currentRecord => {
        if (this.dateService.isSameDate(currentRecord.date, date)) {
            return currentRecord;
        }
      });
      if (foundRecord.length > 0) {
        return foundRecord[0];
      }
      return record;
  }

  setActiveRecord(record: Record): void {
    if (record) {
      this.activeRecord = record;
    } else {
      this.activeRecord = {
        id: null,
        date: null,
        measurements: []
      };
    }
  }

  setActiveDate(date): void {
    this.activeDate = date;
  }

}
