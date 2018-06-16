import { Record } from './record.model';

export interface TrackingDay {
    id: string;
    date: Date;
    record: Record;
}

