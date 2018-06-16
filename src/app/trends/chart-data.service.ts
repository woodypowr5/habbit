import { DateService } from './../shared/date.service';
import { Datapoint } from './../shared/types/datapoint.model';
import { Measurement } from './../shared/types/measurement.model';
import { Record } from './../shared/types/record.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Plan } from '../plan/plan.model';

@Injectable()
export class ChartDataService {

  constructor(private dateService: DateService) { }

  formatToDatapoints(records: Record[], includeMarkers: [string, string], dateRange: [Date, Date]): Datapoint[] {
    const datapoints: Datapoint[] = [];
    records.map(record => {
      const newDatapoint: Datapoint = {
        x: this.getMeasurementValueFromRecord(record, includeMarkers[0]),
        y: this.getMeasurementValueFromRecord(record, includeMarkers[1])
      };
      if (newDatapoint.x !== null && newDatapoint.y !== null) {
        datapoints.push(newDatapoint);
      }
    });
    return datapoints;
  }

  getMeasurementValueFromRecord(record: Record, markerName: string): number {
    for (let i = 0; i < record.measurements.length; i++) {
      if (record.measurements[i].markerName === markerName) {
        return record.measurements[i].value;
      }
    }
    return null;
  }

  createSeriesData(records: Record[], plan: Plan): any {
    const seriesLookup = {};
    const seriesData = [];
    plan.markers.map( marker => {
      seriesLookup[marker.name] = [];
      seriesData.push({
        name: marker.name,
        series: []
      });
    });
    records.map(record => {
      record.measurements.map(measurement => {
        if (measurement.markerName !== undefined && seriesLookup[measurement.markerName] !== undefined) {
          seriesLookup[measurement.markerName].push({
            name: record.date,
            value: measurement.value
          });
        }
      });
    });
    seriesData.map(series => {
      series.series = seriesLookup[series.name];
    });
    return seriesData;
  }
}

