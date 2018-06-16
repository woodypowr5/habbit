import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'tracking', loadChildren: './tracking/tracking.module#TrackingModule', canLoad: [AuthGuard] },
  { path: 'plan', loadChildren: './plan/plan.module#PlanModule', canLoad: [AuthGuard] },
  { path: 'trends', loadChildren: './trends/trends.module#TrendsModule', canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
