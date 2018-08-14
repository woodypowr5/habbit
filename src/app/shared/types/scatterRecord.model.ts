import { DataRecord } from './dataRecord.model';
export interface ScatterRecord extends DataRecord {
    x: number;
    y: number;
    r: number;
}
