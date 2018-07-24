import { Measurement } from '../types/measurement.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor() { }

  setEquivalentMeasurementValue(measurement: Measurement) {
    const alteredMeasurement: Measurement = {
      markerName: measurement.markerName,
      value: measurement.value
    };
    if (measurement.value === 'Yes') {
      alteredMeasurement.value = 1;
    } else if (measurement.value === 'No') {
      alteredMeasurement.value = 0;
    }
    return alteredMeasurement;
  }
}
