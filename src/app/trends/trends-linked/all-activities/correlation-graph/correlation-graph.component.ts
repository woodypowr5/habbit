import { Constants } from './../../../../shared/data/constants';
import { Correlation } from './../../../../shared/types/correlation';
import { Marker } from './../../../../shared/types/marker.model';
import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-correlation-graph',
  templateUrl: './correlation-graph.component.html',
  styleUrls: ['./correlation-graph.component.css']
})
export class CorrelationGraphComponent implements OnInit {
  @Input() correlations: Correlation[];
  private constants = Constants;
  private math = Math;
  private graphRef = ElementRef;

  constructor() { }

  ngOnInit() {
  }

  getCorrelation(marker: Marker): any {
    this.correlations.map(correlation => {

    });
  }

  getLeftPosition(correlation: Correlation): number {
    if (correlation.coefficient < 0) {
      return correlation.coefficient * 100;
    } else {
      return 0;
    }
  }

  getGraphHeight() {
    return this.correlations.length * this.constants.correlationEntryHeight;
  }
}
