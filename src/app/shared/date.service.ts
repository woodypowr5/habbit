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
}
