import { PagesModule } from './pages/pages.module';
import { MarkerService } from './shared/services/marker.service';
import { MarkerDetailService } from './shared/services/markerDetail.service';
import { CalculationService } from './shared/services/calculation.service';
import { ChartDataService } from './shared/services/chart-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { AuthService } from './auth/auth.service';
import { TrackingService } from './shared/services/tracking.service';
import { PlanService } from './shared/services/plan.service';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { HttpModule } from '@angular/http';
import { AuthModule } from './auth/auth.module';
import { reducers } from './app.reducer';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { RecordsComponent } from './tracking/records/records.component';
import { UICarouselModule } from 'ui-carousel';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    PagesModule,
    AngularFirestoreModule,
    HttpModule,
    AngularFireDatabaseModule,
    UICarouselModule,
    SharedModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    AuthService,
    TrackingService,
    MarkerService,
    PlanService,
    ChartDataService,
    MarkerDetailService,
    CalculationService,
    UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
