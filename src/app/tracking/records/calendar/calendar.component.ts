import { DateService } from './../../../shared/services/date.service';
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

  constructor(private dateService: DateService) { }

  get nextMonth(): string {
    const date = this.dateService.getNextMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
    return '' + Constants.months[date.getMonth()] +  ' ' + date.getFullYear();
  }

  get currentMonth(): string {
    return '' + Constants.months[this.activeDate.getMonth()] + ' ' + this.activeDate.getFullYear();
  }

  get previousMonth(): string {
    const date = this.dateService.getPreviousMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
    return '' + Constants.months[date.getMonth()] + ' ' + date.getFullYear();
  }

  ngOnInit() {}

  newMonthSelected(date: Date): void {
    this.newActiveDate.emit(date);
  }

  getDateForNextMonth() {
    const date = this.dateService.getNextMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
    date.setDate(1);
    return date;
  }

  getDateForPreviousMonth() {
    const date = this.dateService.getPreviousMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
    date.setDate(1);
    return date;
  }
}
