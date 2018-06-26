import { History } from './types/history.model';
import { DataSortingService } from './data-sorting-service';
import { Injectable } from '@angular/core';
import { DateService } from './date.service';

@Injectable()
export class MarkerDetailService {

    constructor(private dataSortingService: DataSortingService, private dateService: DateService) {}

    computeDaysInHistory(history: History): number {
        const dateSortedRecords = this.dataSortingService.sortObjectsByKey(history.records, 'date');
        return this.dateService.daysElapsedBetweenDates(dateSortedRecords[0].date, dateSortedRecords[dateSortedRecords.length - 1].date);
    }

    computeDaysWithMeasurements(markerName: string, history: History): number {
        let count = 0;
        history.records.map(record => {
            if (record.measurements.filter(measurement => measurement.markerName === markerName).length > 0) {
                count++;
            }
        });
        return count;
    }

    computeMeasurementRange(): number {
        return 2;
    }

    computeAverageEntryValue(markerName: string, history: History): number {
        let count = 0;
        let sum = 0;
        history.records.map(record => {
            record.measurements.map(measurement => {
                if (measurement.markerName === markerName) {
                    sum += measurement.value;
                    count++;
                }
            });
        });
        return sum / count;
    }

    computeLongestStreak(markerName: string, history: History): number {
        const dateSortedRecords = this.dataSortingService.sortObjectsByKey(history.records, 'date');
        let streak = 0;
        let longestStreak = 0;
        dateSortedRecords.map((record, index) => {
            let found: boolean = false;
            record.measurements.map(measurement => {
                if (measurement.markerName === markerName) {
                    found = true;
                }
            });
            if (found === true as boolean)  {

                streak++;
                if (streak > longestStreak) {
                    longestStreak = streak;
                }
            } else {
                streak = 0;
            }
            if(index + 1 < dateSortedRecords.length) {
                if (!this.dateService.isSameDate(dateSortedRecords[index+1].date, this.dateService.getRelativeDay(record.date, 1)) {
                    streak = 0;
                }
            }
        });
        return longestStreak;
    }

    computeCurrentStreak(markerName: string, history: History): number {
        const dateSortedRecords = this.dataSortingService.sortObjectsByKey(history.records, 'date');
        const today = new Date();
        let streakActive = false;
        let streak = 0;

        history.records.map(record => {
            if (this.dateService.isSameDate(record.date, today)) {
                if (streakActive === false) {
                    streakActive = true;
                }
                streak++;
            } else {
                if (streakActive === true) {
                    return streak;
                }
            }
        });
        return 0;
    }

    computeStandardDeviation(): number {
        return 6;
    }
}
