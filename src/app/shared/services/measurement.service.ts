import { Measurement } from '../types/measurement.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor() { }

  setEquivalentMeasurementValue(measurement: Measurement) {
    if (measurement.value === 'Yes') {
      measurement.value = 1;
    } else if (measurement.value === 'No') {
      measurement.value = 0;
    }
    return measurement;
  }
}
