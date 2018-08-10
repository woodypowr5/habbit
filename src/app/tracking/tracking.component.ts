import { Record } from '../shared/types/record.model';
import { History } from '../shared/types/history.model';
import { DateService } from '../shared/services/date.service';
import { EmptyRecord } from './emptyRecord.class';
import { PlanService } from '../shared/services/plan.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { TrackingService } from '../shared/services/tracking.service';
import * as moment from 'moment';
import { Plan } from '../plan/plan.model';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {
  private activeRecord: Record;
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
  private activeId: number = null;
  private activeDateChanged: Subject<void> = new Subject();

  constructor(
    private trackingService: TrackingService,
    private planService: PlanService,
    private dateService: DateService) {
  }


  ngOnInit() {
    this.activeDate = new Date();
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
      const record: Record = {
        id: null,
        date: this.activeDate,
        measurements: []
      };
      const foundRecord = records.filter(currentRecord => {
        if (this.dateService.isSameDate(currentRecord.date, date.toDate())) {
            return currentRecord;
        }
      });
      if (foundRecord.length > 0) {
        return foundRecord[0];
      } else {
        record.date = this.activeDate;
      }
      return record;
  }

  setActiveRecord(record: Record): void {
    if (record) {
      this.activeRecord = record;
      if (record.date === null) {
        record.date = this.activeDate;
      }
    } else {
      this.activeRecord = {
        id: null,
        date: this.activeDate,
        measurements: []
      };
    }
  }

  setActiveDate(date): void {
    this.activeDate = date;
    this.activeDateChanged.next();
  }
}
