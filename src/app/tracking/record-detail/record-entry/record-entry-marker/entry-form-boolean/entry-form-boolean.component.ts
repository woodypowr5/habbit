import { Measurement } from './../../../../../shared/types/measurement.model';
import { Marker } from './../../../../../shared/types/marker.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entry-form-boolean',
  templateUrl: './entry-form-boolean.component.html',
  styleUrls: ['./entry-form-boolean.component.css']
})
export class EntryFormBooleanComponent implements OnInit {
  @Input() marker: Marker;
  @Input() initialValue: string;
  @Output() saveMeasurement: EventEmitter<Measurement> = new EventEmitter();
  private currentValue;

  constructor() { }

  ngOnInit() {
    this.currentValue = this.initialValue;
  }

  save(): void {
    const newMeasurement: Measurement = {
      markerName: this.marker.name,
      value: this.currentValue
    };
    this.saveMeasurement.emit(newMeasurement);
  }

  clear(): void {
    this.currentValue = undefined;
  }
}
