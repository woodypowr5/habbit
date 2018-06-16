import { Measurement } from './measurement.model';

export interface Record {
    date: Date;
    id: string;
    measurements: Measurement[];
}
