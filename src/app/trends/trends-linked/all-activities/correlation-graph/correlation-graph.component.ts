import { Constants } from './../../../../shared/data/constants';
import { Correlation } from './../../../../shared/types/correlation';
import { Marker } from './../../../../shared/types/marker.model';
import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-correlation-graph',
  templateUrl: './correlation-graph.component.html',
  styleUrls: ['./correlation-graph.component.css']
})
export class CorrelationGraphComponent implements OnInit {
  @Input() correlations: Correlation[];
  @Output() newActiveCorrelation: EventEmitter<Correlation> = new EventEmitter(null);
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

  getCorrelationColor(correlation: Correlation): string {
    const opacity = Math.abs(correlation.coefficient * 0.67) + .33;
    if (correlation.coefficient >= 0) {
      return 'rgba(137, 191, 41, ' + opacity + ')';
    } else {
      return 'rgba(232, 152, 12, ' + opacity + ')';
    }
  }

  setActiveCorrelationrMarker(correlation: Correlation): void {
    this.newActiveCorrelation.emit(correlation);
  }
}
