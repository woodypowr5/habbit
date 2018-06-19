import { DataSortingService } from './../shared/data-sorting-service';
import { Marker } from './../../../../ngrx-06-bugfix/src/app/shared/types/marker.model';
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
    // console.log(includeMarkers);
    const filteredSeriesData: any[] = [];
    includeMarkers.map(markerName => {
      filteredSeriesData.push (seriesData.filter(series => {
        return series.name === markerName;
      })[0]);
    });
    // console.log(filteredSeriesData);
    return filteredSeriesData;
  }

  computeMovingAverage(rawData: any) {
  }

  computeGlobalAverage(rawData: any) {
    const seriesData: any = [];
    rawData.map(series => {
      seriesData.push({
        name:  series.name,
        series: this.computeSeriesGlobalAverage(series.series)
      });
      // seriesData.push({
      //   name: series.name,
      //   series: series.series
      // });
    });
    return seriesData;
  }

  computeSeriesGlobalAverage(seriesData): any {
    seriesData = this.dataSortingService.sortObjectsByKey(seriesData, 'name');
    // console.log("ORIGINAL SERIES DATA: ");
    // console.log(seriesData);
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
    // console.log("AVERAGES: ");
    // console.log(newSeriesData);
    return newSeriesData;
  }

  computeSeriesMovingAverage() {

  }
}

