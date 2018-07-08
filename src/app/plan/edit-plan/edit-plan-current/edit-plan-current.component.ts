import { MarkerService } from './../../../shared/services/marker.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-plan-current',
  templateUrl: './edit-plan-current.component.html',
  styleUrls: ['./edit-plan-current.component.css']
})
export class EditPlanCurrentComponent implements OnInit {
  @Input() myPlan;

  constructor() { }

  ngOnInit() {}
}
