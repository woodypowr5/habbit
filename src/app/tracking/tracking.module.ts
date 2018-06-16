import { CalendarDayPipe } from './../shared/pipes/calendarDay.pipe';
import { AdjustedDatePipe } from './records/adjustedDate.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { TrackingComponent } from './tracking.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { TrackingRoutingModule } from './tracking-routing.module';
import { RecordsComponent } from './records/records.component';
import { RecordComponent } from './records/record/record.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';
import { NoRecordComponent } from './record-detail/no-record/no-record.component';
import { RecordEntryComponent } from './record-detail/record-entry/record-entry.component';
import { RecordEntryMarkerComponent } from './record-detail/record-entry/record-entry-marker/record-entry-marker.component';
import { EntryFormRangeComponent } from './record-detail/record-entry/record-entry-marker/entry-form-range/entry-form-range.component';
import { EntryFormEnumeratedComponent } from './record-detail/record-entry/record-entry-marker/entry-form-enumerated/entry-form-enumerated.component';
import { EntryFormBooleanComponent } from './record-detail/record-entry/record-entry-marker/entry-form-boolean/entry-form-boolean.component';

@NgModule({
  declarations: [
    TrackingComponent,
    RecordsComponent,
    RecordComponent,
    RecordDetailComponent,
    AdjustedDatePipe,
    CalendarDayPipe,
    NoRecordComponent,
    RecordEntryComponent,
    RecordEntryMarkerComponent,
    EntryFormRangeComponent,
    EntryFormEnumeratedComponent,
    EntryFormBooleanComponent
  ],
  imports: [
    SharedModule,
    TrackingRoutingModule
  ],
  providers: [
    AdjustedDatePipe,
    CalendarDayPipe
  ]
})
export class TrackingModule {}
