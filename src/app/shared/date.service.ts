import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  constructor() { }

  isSameDate(date1, date2) {
    return (moment(date1).date() === moment(date2).date())
        && (moment(date1).month() === moment(date2).month())
        && (moment(date1).year() === moment(date2).year());
  }

  daysElapsedBetweenDates(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    return Math.ceil(Math.abs((date1.getTime() - date2.getTime()) / (oneDay))) + 1;
  }
}
