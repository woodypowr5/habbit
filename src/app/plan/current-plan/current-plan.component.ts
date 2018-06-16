import { Marker } from './../../shared/types/marker.model';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Plan } from './../plan.model';

@Component({
  selector: 'app-current-plan',
  templateUrl: './current-plan.component.html',
  styleUrls: ['./current-plan.component.css']
})
export class CurrentPlanComponent implements OnInit {
  @Input() availableMarkers: Marker[];
  @Input() myPlan: Plan;

  constructor() { }

  ngOnInit() {}

}
