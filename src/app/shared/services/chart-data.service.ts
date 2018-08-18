import { MeasurementService } from './measurement.service';
import { Measurement } from '../types/measurement.model';
import { History } from '../types/history.model';
import { Plan } from '../../plan/plan.model';
import { DataSortingService } from './data-sorting-service';
import { Marker } from '../types/marker.model';
import { DateService } from './date.service';
import { Datapoint } from '../types/datapoint.model';
import { Record } from '../types/record.model';
import { Injectable } from '@angular/core';
import * as jStat from 'jStat';
import * as jerzy from 'jerzy';

@Injectable()
export class ChartDataService {

  constructor(
    private dateService: DateService,
    private dataSortingService: DataSortingService,
    private measurementService: MeasurementService
  ) { }

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

  transformBooleanData(seriesData: any) {
    seriesData.map(series => {
      series.series.map(measurement =>  {
        if (measurement.value === 'Yes') {
          measurement.value = 1;
        } else if (measurement.value === 'No') {
          measurement.value = 0;
        }
      });
    });
    return seriesData;
  }

  computeMovingAverage(rawData: any): any {
    const seriesData: any = [];
    rawData.map(series => {
      seriesData.push({
        name:  series.name,
        series: this.computeSeriesMovingAverage(series.series, 3)
      });
    });
    return seriesData;
  }

  computeGlobalAverage(rawData: any): any {
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
      name: '',
      series: datapoints
    }];
  }

  computeBarDistribution(marker: Marker, history: History) {
    const distrbution: number[] = [];
    const markerAdapter: Marker = {
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
  }

  computeProbabilityDistribution(marker: Marker, history: History): any {
    const markerAdapter: Marker = {
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
      name : '',
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
        value: (v.ecdf(i) - prevBinProbability) * 100
      });
      prevBinProbability = v.ecdf(i);
    }
    return eCDF;
  }

  computeBooleanBarData(markerName: string, history: History): any {
    let yesMeasurements = 0;
    let totalMeasurements = 0;
    const dataObject = {
      seriesData: [],
      average: 0,
      stdDeviation: 0
    };

    const seriesData: any = [];

    history.records.map(record => {
      record.measurements.map(measurement => {
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
    dataObject.seriesData = seriesData;
    dataObject.average = yesMeasurements / totalMeasurements;

    return dataObject;
  }

  computeRangeBarData(marker: Marker, history: History) {
    const seriesData: any = [];
    const distribution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    history.records.map(record => {
      record.measurements.map(measurement => {
        if (measurement.markerName === marker.name) {
          distribution[measurement.value]++;
        }
      });
    });
    distribution.map((value, index) => {
      seriesData.push({
        name: index,
        value: value
      });
    });
    return seriesData;
  }

  computeHeatmapSeries(includeMarkers: Marker[], records: Record[], plan: Plan): any {
    const heatmapSeries = [];
    this.dataSortingService.sortObjectsByKey(records, 'date').map( record => {
    const measurementsForDate = [];
      includeMarkers.map(marker => {
        record.measurements.map(measurement => {
          if (measurement.markerName === marker.name) {
            measurementsForDate.push({
              name: marker.name,
              value: measurement.value
            });
          }
        });
      });
      heatmapSeries.push({
        name: record.date,
        series: measurementsForDate
      });
    });
    return heatmapSeries;
  }

  computeLinearCorrelation(records: Record[], includeMarkers: Marker[]): number {
    const vector1: number[] = [];
    const vector2: number[] = [];
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      let foundMeasurement1: Measurement;
      let foundMeasurement2: Measurement;
      for (let j = 0; j < record.measurements.length; j++) {
        const measurement = record.measurements[j];
        const equivalentMeasurement = this.measurementService.setEquivalentMeasurementValue(measurement);
        if (equivalentMeasurement.markerName === includeMarkers[0].name) {
          foundMeasurement1 = equivalentMeasurement;
        }
        if (equivalentMeasurement.markerName === includeMarkers[1].name) {
          foundMeasurement2 = equivalentMeasurement;
        }
      }
      if (foundMeasurement1 && foundMeasurement2) {
        vector1.push(foundMeasurement1.value);
        vector2.push(foundMeasurement2.value);
      }
    }
    return jStat.corrcoeff(vector1, vector2);
  }
}

