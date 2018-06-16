import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'calendarDay'
})
export class CalendarDayPipe implements PipeTransform {
  transform(date: moment.Moment) {
    if (!date) {
      return '';
    }
    date = moment(date);
    return date.format('DD MMM');
  }
}
