import { AllActivitiesComponent } from './trends-linked/all-activities/all-activities.component';
import { NgModule } from '@angular/core';
import { TrendsComponent } from './trends.component';
import { TrendsRoutingModule } from './trends-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TrendsSummaryComponent } from './trends-summary/trends-summary.component';
import { TrendsDailyComponent } from './trends-daily/trends-daily.component';
import { TrendsLinkedComponent } from './trends-linked/trends-linked.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ActivityDetailsComponent } from './trends-linked/activity-details/activity-details.component';
import { HeatmapComponent } from './trends-summary/heatmap/heatmap.component';

@NgModule({
    declarations: [
        TrendsComponent,
        TrendsSummaryComponent,
        TrendsDailyComponent,
        TrendsLinkedComponent,
        AllActivitiesComponent,
        ActivityDetailsComponent,
        HeatmapComponent
    ],
    imports: [
        SharedModule,
        NgxChartsModule,
        TrendsRoutingModule
    ],
    providers: []
})
export class TrendsModule {}
