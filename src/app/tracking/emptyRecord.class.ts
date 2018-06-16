import { Record } from './../shared/types/record.model';

export class EmptyRecord implements Record {
    id = null;
    date = null;
    measurements = [];
}
