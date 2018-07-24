import { Measurement } from './../../../../../shared/types/measurement.model';
import { Marker } from '../../../../../shared/types/marker.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entry-form-scalar',
  templateUrl: './entry-form-scalar.component.html',
  styleUrls: ['./entry-form-scalar.component.css']
})
export class EntryFormScalarComponent implements OnInit {
  @Input() marker: Marker;
  @Output() saveMeasurement: EventEmitter<Measurement> = new EventEmitter();
  private currentValue;

  constructor() { }

  ngOnInit() {}

  save(value) {
    if (isNaN(value) === false) {
      const newMeasurement: Measurement = {
        markerName: this.marker.name,
        value: Number(value)
      };
      this.saveMeasurement.emit(newMeasurement);
    } else {
      console.log("not a number");
    }
    
  }
}
