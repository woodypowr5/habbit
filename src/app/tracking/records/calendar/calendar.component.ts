import { DateService } from '../../../shared/services/date.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { Constants } from '../../../shared/data/constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() activeDate: Date;
  @Output() newActiveDate: EventEmitter<Date> = new EventEmitter();
  private Constants = Constants;

  constructor(private dateService: DateService) { }

  get previousMonth(): Date {
    return moment(this.activeDate).subtract(1, 'M').toDate();
  }

  get nextMonth(): Date {
    return moment(this.activeDate).add(1, 'M').toDate();
  }

  ngOnInit() {}

  newMonthSelected(date: Date): void {
    date.setDate(1);
    this.newActiveDate.emit(date);
  }

  getDateForNextMonth(): Date {
    return this.nextMonth;
  }

  getDateForPreviousMonth(): Date {
    return this.previousMonth;
  }
}
