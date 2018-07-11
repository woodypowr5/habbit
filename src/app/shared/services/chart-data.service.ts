import { History } from './../types/history.model';
import { Plan } from './../../plan/plan.model';
import { DataSortingService } from './data-sorting-service';
import { Marker } from '../types/marker.model';
import { DateService } from '../services/date.service';
import { Datapoint } from '../types/datapoint.model';
import { Measurement } from '../types/measurement.model';
import { Record } from '../types/record.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { raw } from 'body-parser';
import * as jStat from 'jStat';
import * as jerzy from 'jerzy';

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

  filterDataBySeries(includeMarkers: Marker[], seriesData: any): any[] {
    const filteredSeriesData: any[] = [];
    includeMarkers.map(marker => {
      filteredSeriesData.push (seriesData.filter(series => {
        return series.name === marker.name;
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
      const relevantSeries = seriesData.slice(0, index + 1);
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

  computeScatterSeries(records: Record[], includeMarkers: [string, string]): any {
    const datapoints: Datapoint[] = this.formatToDatapoints(records, includeMarkers);
    return [{
      name: 'stuff',
      series: datapoints
    }];
  }

  computeProbabilityDistribution(marker: Marker, history: History): any {
    const markerAdapter: Marker = {
      id: '',
      name: marker.name,
      dataType: '',
      isLoading: false,
      category: '',
      iconName: ''
    };
    const planAdapter: Plan = {
      name: '',
      markers: [
        markerAdapter
      ]
    };
    const rawData = this.computeRawData(history.records, planAdapter);
    const vectorData = this.createVectorFromSeries(rawData[0].series);
    return [{
      name : 'test',
      series: this.computeEPDF(vectorData, marker)
    }];
  }

  createVectorFromSeries(series: any): number[] {
    const vector = [];
    series.map( data => {
      vector.push(data.value);
    });
    return vector;
  }

  computeEPDF(vector: number[], marker: Marker): any[] {
    const v = new jerzy.Vector(vector);
    const eCDF = [];
    let prevBinProbability = 0;
    for (let i = marker.min; i <= marker.max; i = i + marker.delta) {
      eCDF.push({
        name:  String(i),
        value: v.ecdf(i) - prevBinProbability
      });
      prevBinProbability = v.ecdf(i);
    }
    return eCDF;
  }

  computeBooleanBarData(markerName: string, history: History): any {
    console.log(markerName)
    let yesMeasurements = 0;
    let totalMeasurements = 0;
    const seriesData: any = [];

    history.records.map(record => {
      record.measurements.map(measurement => {
        console.log(measurement)
        if (measurement.markerName === markerName) {
          totalMeasurements++;
          if (measurement.value === 'Yes') {
            yesMeasurements++;
          }
        }
      });
    });
    seriesData.push({
      name: 'Yes',
      value: yesMeasurements
    });
    seriesData.push({
      name: 'No',
      value: totalMeasurements - yesMeasurements
    });
    console.log(seriesData)
    return seriesData;
  }

}

