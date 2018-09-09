import { Correlation } from './../../../../shared/types/correlation';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-correlation-explanation',
  templateUrl: './correlation-explanation.component.html',
  styleUrls: ['./correlation-explanation.component.css']
})
export class CorrelationExplanationComponent implements OnInit {
  @Input() correlation: Correlation;
  
  constructor() { }

  ngOnInit() {
  }

}
