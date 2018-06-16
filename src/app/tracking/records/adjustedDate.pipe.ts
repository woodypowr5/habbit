import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'adjustedDate'
})
export class AdjustedDatePipe implements PipeTransform {
  transform(value: any, index: any) {
    if (!value) {
      return '';
    }
    value = moment(value).add(index - 3, 'days');
    return value.format('DD MMM');
  }
}
