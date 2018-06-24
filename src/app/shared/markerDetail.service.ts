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

    computeMeasurementRange(): number {
        return 2;
    }

    computeDaysWithMeasurements(): number {
        return 3;
    }

    computeAverageEntryValue(): number {
        return 4;
    }

    computeLongestEntryStreak(): number {
        return 5;
    }

    computeStandardDeviation(): number {
        return 6;
    }
}
