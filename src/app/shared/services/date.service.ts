import { Constants } from '../data/constants';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  constructor() { }

  isSameDate(date1: Date, date2: Date) {
    return (moment(date1).date() === moment(date2).date())
        && (moment(date1).month() === moment(date2).month())
        && (moment(date1).year() === moment(date2).year());
  }

  daysElapsedBetweenDates(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    return Math.ceil(Math.abs((date1.getTime() - date2.getTime()) / (oneDay))) + 1;
  }

  getRelativeDay(date: Date, offset: number): Date {
    if (offset > 0) {
      return moment(date).add(offset, 'd').toDate();
    } else {
      return moment(date).subtract(offset * -1, 'd').toDate();
    }
  }

  getNextDay(date: Date): Date {
    return this.getRelativeDay(date, 1);
  }

  getFirstOfMonth(month: string, year: number): Date {
    const monthNumber = Constants.months.indexOf(month);
    const newDate = new Date;
    newDate.setFullYear(year);
    newDate.setMonth(monthNumber);
    newDate.setDate(0);
    return newDate;
  }

  getNextMonth(year: number, currentMonth: number): Date {
    const newDate  = new Date;
    if (currentMonth === 10) {
      newDate.setMonth(0);
      newDate.setFullYear(year + 1);
    } else {
      newDate.setMonth(currentMonth + 2);
      newDate.setFullYear(year);
    }
    newDate.setDate(0);
    return newDate;
  }

  getPreviousMonth(year: number, currentMonth: number): Date {
    const newDate  = new Date;
    if (currentMonth === 0) {
      newDate.setMonth(12);
      newDate.setFullYear(year);
    } else {
      newDate.setMonth(currentMonth);
      newDate.setFullYear(year);
    }
    newDate.setDate(0);
    return newDate;
  }
}
