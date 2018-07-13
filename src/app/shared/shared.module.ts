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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    TooltipComponent,
    PopoverComponent
  ],
  providers: [
    DateService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    TooltipComponent,
    PopoverComponent
  ]
})
export class SharedModule {}
