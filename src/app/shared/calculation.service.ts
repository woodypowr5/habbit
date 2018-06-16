import { Injectable } from '@angular/core';

@Injectable()
export class CalculationService {

    constructor() {}

    getMedianIndexFromArray(values: any[]): number {
        return Math.floor(values.length / 2);
    }

    getMedianIndexFromLength(arrayLength: number): number {
        return Math.floor(arrayLength / 2);
    }

    getMedianValue(values: any[]): any {
        return values[Math.floor(values.length / 2)];
    }

    translateValueToPercentage(min: number, max: number, value: number): number {
        return ((value - 1) / (max - min)) * 100;
    }

    translatePercentageToValue(min: number, max: number, percentage: number): number {
        return (percentage * (max - min) / 100) + min;
    }

    getDiscreteStepPercentage(min: number, max: number, step: number): number {
        if (step !== undefined) {
          return step / (max - min) * 100;
        }
        return undefined;
      }
}
