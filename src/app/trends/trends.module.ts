import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { TrendsComponent } from './trends.component';
import { TrendsRoutingModule } from './trends-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TrendsSummaryComponent } from './trends-summary/trends-summary.component';
import { TrendsDailyComponent } from './trends-daily/trends-daily.component';
import { TrendsLinkedComponent } from './trends-linked/trends-linked.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    declarations: [
        TrendsComponent,
        TrendsSummaryComponent,
        TrendsDailyComponent,
        TrendsLinkedComponent
    ],
    imports: [
        SharedModule,
        NgxChartsModule,
        TrendsRoutingModule
    ],
    providers: []
})
export class TrendsModule {}
