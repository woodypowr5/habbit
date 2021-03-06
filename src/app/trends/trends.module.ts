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
import { CorrelationGraphComponent } from './trends-linked/all-activities/correlation-graph/correlation-graph.component';
import { CorrelationDetailsComponent } from './trends-linked/all-activities/correlation-graph/correlation-details/correlation-details.component';

@NgModule({
    declarations: [
        TrendsComponent,
        TrendsSummaryComponent,
        TrendsDailyComponent,
        TrendsLinkedComponent,
        AllActivitiesComponent,
        ActivityDetailsComponent,
        HeatmapComponent,
        CorrelationGraphComponent,
        CorrelationDetailsComponent
    ],
    imports: [
        SharedModule,
        NgxChartsModule,
        TrendsRoutingModule
    ],
    providers: [],
    entryComponents: [CorrelationDetailsComponent]
})
export class TrendsModule {}
