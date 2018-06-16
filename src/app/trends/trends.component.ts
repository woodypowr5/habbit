import { PlanService } from './../plan/plan.service';
import { Record } from './../shared/types/record.model';
import { History } from './../shared/types/history.model';
import { Subscription } from 'rxjs/subscription';
import { TrackingService } from './../tracking/tracking.service';
import { Component, OnInit } from '@angular/core';
import { Plan } from '../plan/plan.model';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  private records: Record[];
  private plan: Plan;
  private historySubscription: Subscription;
  private planSubscription: Subscription;

  constructor(private trackingService: TrackingService, private planService: PlanService) {
    this.historySubscription = this.trackingService.historyChanged.subscribe(history => {
      this.records = history.records;
    });
    this.planSubscription = this.planService.planChanged.subscribe(plan => {
      this.plan = plan;
    });
  }

  ngOnInit() {
  }

}
