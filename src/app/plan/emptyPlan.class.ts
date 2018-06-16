import { Plan } from './plan.model';

export class EmptyPlan implements Plan {
    name = null;
    markers = [];
}
