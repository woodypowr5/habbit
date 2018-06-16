// import { Injectable } from '@angular/core';
// import { Record } from '../tracking/record.model';
// import { DateService } from './../shared/date.service';
// import * as moment from 'moment';

// @Injectable()
// export class RecordQueryService {

//   constructor() { }

//   getRecordByDate(records: Record[], date: Date) {
//     const indexDate = moment(new Date(date + ', ' + new Date().getFullYear()));
//     const record = new EmptyRecord;
//       const foundRecord = records.filter(currentRecord => {
//         if (this.dateService.isSameDate(currentRecord.date, date)) {
//             return currentRecord;
//         }
//       });
//       if (foundRecord.length > 0) {
//         return foundRecord[0];
//       }
//       return record;
//   }

//   getRecordByIndex(ecords: Record[], index: number) {

//   }

// }
