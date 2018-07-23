import { Plan } from '../../plan/plan.model';
import { Record } from '../../shared/types/record.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trends-linked',
  templateUrl: './trends-linked.component.html',
  styleUrls: ['./trends-linked.component.css']
})
export class TrendsLinkedComponent implements OnInit {
  @Input() records: Record[];
  @Input() plan: Plan;

  constructor() {}

  ngOnInit() {

  }
}

