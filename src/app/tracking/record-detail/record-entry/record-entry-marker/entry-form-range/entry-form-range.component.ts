import { Measurement } from './../../../../../shared/types/measurement.model';
import { Marker } from './../../../../../shared/types/marker.model';
import { CalculationService } from './../../../../../shared/calculation.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entry-form-range',
  templateUrl: './entry-form-range.component.html',
  styleUrls: ['./entry-form-range.component.css']
})
export class EntryFormRangeComponent implements OnInit {
  @Input() initialValue: number;
  @Input() marker: Marker;
  @Output() saveMeasurement: EventEmitter<Measurement> = new EventEmitter();
  sliderValue: number;

  constructor(private calculationService: CalculationService) { }

  ngOnInit() {
    this.sliderValue = this.initialValue;
  }

  getStepPercentage(min: number, max: number, step: number): number {
    return this.calculationService.getDiscreteStepPercentage(min, max, step);
  }

  save(): void {
    const newMeasurement: Measurement = {
      markerName: this.marker.name,
      value: this.sliderValue
    };
    this.saveMeasurement.emit(newMeasurement);
  }

  clear(sliderRef: any): void {
    sliderRef.writeValue(0);
    this.sliderValue = undefined;
  }

}
