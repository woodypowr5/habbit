import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { PlanComponent } from './plan.component';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

import { PlanRoutingModule } from './plan-routing.module';
import { CurrentPlanComponent } from './current-plan/current-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { EditMarkerCardComponent } from './edit-plan/edit-marker-card/edit-marker-card.component';
import { EditPlanCurrentComponent } from './edit-plan/edit-plan-current/edit-plan-current.component';
import { ActiveMarkerCardComponent } from './edit-plan/active-marker-card/active-marker-card.component';
import { ActiveMarkerSettingsComponent } from './edit-plan/active-marker-card/active-marker-settings/active-marker-settings.component';

@NgModule({
  declarations: [
    PlanComponent,
    CurrentPlanComponent,
    EditPlanComponent,
    EditMarkerCardComponent,
    EditPlanCurrentComponent,
    ActiveMarkerCardComponent,
    ActiveMarkerSettingsComponent
  ],
  imports: [
    SharedModule,
    PlanRoutingModule
  ],
  entryComponents: [ActiveMarkerSettingsComponent]
})
export class PlanModule {}
