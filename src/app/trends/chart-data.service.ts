import { DataSortingService } from './../shared/data-sorting-service';
import { Marker } from './../../../src/app/shared/types/marker.model';
import { DateService } from './../shared/date.service';
import { Datapoint } from './../shared/types/datapoint.model';
import { Measurement } from './../shared/types/measurement.model';
import { Record } from './../shared/types/record.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Plan } from '../plan/plan.model';
import { raw } from 'body-parser';
import * as jStat from 'jStat';

@Injectable()
export class ChartDataService {

  constructor(private dateService: DateService, private dataSortingService: DataSortingService) { }

  formatToDatapoints(records: Record[], includeMarkers: [string, string]): any {
    const datapoints: Datapoint[] = [];
    records.map(record => {
      const newDatapoint: Datapoint = {
        name: record.date,
        x: this.getMeasurementValueFromRecord(record, includeMarkers[0]),
        y: this.getMeasurementValueFromRecord(record, includeMarkers[1]),
        r: 1
      };
      if (newDatapoint.x !== null && newDatapoint.y !== null) {
        let foundDuplicate = false;
        for (let i = 0; i < datapoints.length; i++) {
          if (datapoints[i].x === newDatapoint.x && datapoints[i].y === newDatapoint.y) {
            datapoints[i].r++;
            foundDuplicate = true;
            break;
          }
        }
        if (foundDuplicate === false) {
          datapoints.push(newDatapoint);
        }
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

  computeRawData(records: Record[], plan: Plan): any {
    const seriesLookup: any = {};
    const seriesData: any = [];
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

  filterDataBySeries(includeMarkers: string[], seriesData: any): any[] {
    const filteredSeriesData: any[] = [];
    includeMarkers.map(markerName => {
      filteredSeriesData.push (seriesData.filter(series => {
        return series.name === markerName;
      })[0]);
    });
    return filteredSeriesData;
  }

  computeMovingAverage(rawData: any) {
    const seriesData: any = [];
    rawData.map(series => {
      seriesData.push({
        name:  series.name,
        series: this.computeSeriesMovingAverage(series.series, 3)
      });
    });
    return seriesData;
  }

  computeGlobalAverage(rawData: any) {
    const seriesData: any = [];
    rawData.map(series => {
      seriesData.push({
        name:  series.name,
        series: this.computeSeriesGlobalAverage(series.series)
      });
    });
    return seriesData;
  }

  computeSeriesMovingAverage(seriesData: any, relevantPeriod: number): any {
    seriesData = this.dataSortingService.sortObjectsByKey(seriesData, 'name');
    const newSeriesData = [];
    seriesData.map(((dataPoint, index) => {
      let relevantSeries;
      if (index - relevantPeriod >= 0) {
        relevantSeries = seriesData.slice(index - relevantPeriod, index);
      } else {
        relevantSeries = seriesData.slice(0, index);
      }
      const relevantValues = [];
      relevantSeries.map(relevantDataPoint => {
        relevantValues.push(relevantDataPoint.value);
      });
      if (relevantValues.length > 0) {
        newSeriesData.push({
          name: dataPoint.name,
          value: jStat.mean(relevantValues)
        });
      }
    }));
    return newSeriesData;
  }

  computeSeriesGlobalAverage(seriesData: any): any {
    seriesData = this.dataSortingService.sortObjectsByKey(seriesData, 'name');
    const newSeriesData = [];
    seriesData.map(((dataPoint, index) => {
      const relevantSeries = seriesData.slice(0, index);
      const relevantValues = [];
      relevantSeries.map(relevantDataPoint => {
        relevantValues.push(relevantDataPoint.value);
      });
      if (relevantValues.length > 0) {
        newSeriesData.push({
          name: dataPoint.name,
          value: jStat.mean(relevantValues)
        });
      }
    }));
    return newSeriesData;
  }

  computeScatterSeries(records: Record[], includeMarkers: [string, string]) {
    const datapoints: Datapoint[] = this.formatToDatapoints(records, includeMarkers);
    return [{
      name: 'stuff',
      series: datapoints
    }];
  }
}



// "name": "Germany",
//     "series": [
//       {
//         "name": "2010",
//         "x": "2010-01-01T08:00:00.000Z",
//         "y": 80.3,
//         "r": 80.4
//       },
//       {
//         "name": "2000",
//         "x": "2000-01-01T08:00:00.000Z",
//         "y": 80.3,
//         "r": 78
//       },
//       {
//         "name": "1990",
//         "x": "1990-01-01T08:00:00.000Z",
//         "y": 75.4,
//         "r": 79
//       }
//     ]

