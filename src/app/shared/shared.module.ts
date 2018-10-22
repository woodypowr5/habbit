import { MakePaymentComponent } from './components/make-payment/make-payment.component';

import { CalendarDayPipe } from './pipes/calendarDay.pipe';
import { EntryFormBooleanComponent } from '../tracking/record-detail/record-entry/record-entry-marker/entry-form-boolean/entry-form-boolean.component';
import { EntryFormScalarComponent } from '../tracking/record-detail/record-entry/record-entry-marker/entry-form-scalar/entry-form-scalar.component';
import { EntryFormRangeComponent } from '../tracking/record-detail/record-entry/record-entry-marker/entry-form-range/entry-form-range.component';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { DateService } from './services/date.service';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { HttpModule } from '@angular/http';
import { PopoverComponent } from './components/popover/popover.component';
import { MarkerCardComponent } from './components/marker-card/marker-card.component';
import { SubheaderComponent } from './components/subheader/subheader.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SubscriptionStatusComponent } from './components/subscription-status/subscription-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    RouterModule,
  ],
  declarations: [
    MakePaymentComponent,
    TooltipComponent,
    PopoverComponent,
    MarkerCardComponent,
    SubheaderComponent,
    EntryFormRangeComponent,
    EntryFormScalarComponent,
    EntryFormBooleanComponent,
    CalendarDayPipe,
    FooterComponent,
    SubscriptionStatusComponent,
  ],
  providers: [
    DateService
  ],
  exports: [
    MakePaymentComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    TooltipComponent,
    PopoverComponent,
    MarkerCardComponent,
    SubheaderComponent,
    EntryFormRangeComponent,
    EntryFormScalarComponent,
    EntryFormBooleanComponent,
    SubscriptionStatusComponent,
    CalendarDayPipe,
    RecaptchaModule,
    RecaptchaFormsModule,
    FooterComponent
  ]
})
export class SharedModule {}
