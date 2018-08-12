import { NgModule } from '@angular/core';
import { PlanComponent } from './plan.component';
import { SharedModule } from '../shared/shared.module';
import { PlanRoutingModule } from './plan-routing.module';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { EditPlanCurrentComponent } from './edit-plan/edit-plan-current/edit-plan-current.component';
import { ActiveMarkerCardComponent } from './edit-plan/active-marker-card/active-marker-card.component';
import { CustomMarkerComponent } from './edit-plan/custom-marker/custom-marker.component';
import { ExampleMarkerComponent } from './edit-plan/custom-marker/example-marker/example-marker.component';
import { ConfirmRemovalComponent } from './edit-plan/active-marker-card/confirm-removal/confirm-removal.component';

@NgModule({
  declarations: [
    PlanComponent,
    EditPlanComponent,
    EditPlanCurrentComponent,
    ActiveMarkerCardComponent,
    CustomMarkerComponent,
    ExampleMarkerComponent,
    ConfirmRemovalComponent
  ],
  imports: [
    SharedModule,
    PlanRoutingModule,
  ],
  entryComponents: [ConfirmRemovalComponent, CustomMarkerComponent]
})
export class PlanModule {}
