import { ContactComponent } from './pages/contact/contact.component';
import { CareersComponent } from './pages/careers/careers.component';
import { MissionComponent } from './pages/mission/mission.component';
import { AboutComponent } from './pages/about/about.component';
import { LegalComponent } from './pages/legal/legal.component';
import { FeatureComponent } from './pages/feature/feature.component';
import { TosComponent } from './pages/tos/tos.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './auth/auth.guard';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'tos', component: TosComponent },
  { path: 'report', component: ReportComponent },
  { path: 'feature', component: FeatureComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'about', component: AboutComponent },
  { path: 'mission', component: MissionComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'tracking', loadChildren: './tracking/tracking.module#TrackingModule', canLoad: [AuthGuard] },
  { path: 'plan', loadChildren: './plan/plan.module#PlanModule', canLoad: [AuthGuard] },
  { path: 'trends', loadChildren: './trends/trends.module#TrendsModule', canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
