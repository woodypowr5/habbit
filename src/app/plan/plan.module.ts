import { NgModule } from '@angular/core';
import { PlanComponent } from './plan.component';
import { SharedModule } from '../shared/shared.module';
import { PlanRoutingModule } from './plan-routing.module';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { EditPlanCurrentComponent } from './edit-plan/edit-plan-current/edit-plan-current.component';
import { ActiveMarkerCardComponent } from './edit-plan/active-marker-card/active-marker-card.component';
import { ActiveMarkerSettingsComponent } from './edit-plan/active-marker-card/active-marker-settings/active-marker-settings.component';
import { CustomMarkerComponent } from './edit-plan/custom-marker/custom-marker.component';
import { ExampleMarkerComponent } from './edit-plan/custom-marker/example-marker/example-marker.component';

@NgModule({
  declarations: [
    PlanComponent,
    EditPlanComponent,
    EditPlanCurrentComponent,
    ActiveMarkerCardComponent,
    ActiveMarkerSettingsComponent,
    CustomMarkerComponent,
    ExampleMarkerComponent
  ],
  imports: [
    SharedModule,
    PlanRoutingModule,
  ],
  entryComponents: [ActiveMarkerSettingsComponent, CustomMarkerComponent]
})
export class PlanModule {}
