import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-plan-current',
  templateUrl: './edit-plan-current.component.html',
  styleUrls: ['./edit-plan-current.component.css']
})
export class EditPlanCurrentComponent implements OnInit {
  @Input() myPlan;

  constructor() { }

  ngOnInit() {
  }

}
