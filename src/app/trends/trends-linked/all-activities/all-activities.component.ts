import { PopoverText } from '../../../shared/data/popoverText';
import { ChartOptions } from '../../../shared/data/chartOptions';
import { ChartDataService } from '../../../shared/services/chart-data.service';
import { Marker } from '../../../shared/types/marker.model';
import { Plan } from '../../../plan/plan.model';
import { Component, OnInit, Input} from '@angular/core';
import { Record } from '../../../shared/types/record.model';

@Component({
  selector: 'app-all-activities',
  templateUrl: './all-activities.component.html',
  styleUrls: ['./all-activities.component.css']
})
export class AllActivitiesComponent implements OnInit {
  @Input() plan: Plan;
  @Input() records: Record[];
  private activeMarker: Marker;
  private correlationCoefficients: number[] = [];
  private chartOptions = ChartOptions.trends.linkedAllMarkers;
  private popoverText = PopoverText.trends.linked.allMarkers;
  private correlationDescriptions = {
    strengths: [],
    polarities: []
  };
  constructor(private chartDataService: ChartDataService) { }

  public get otherMarkers(): Marker[] {
    if (this.plan && this.activeMarker) {
      return this.plan.markers.filter(marker => marker.name !== this.activeMarker.name);
    }
    return [];
  }

  ngOnInit() {
    this.setActiveMarker(this.plan.markers[0]);
  }

  setActiveMarker(marker: Marker) {
    this.correlationCoefficients = [];
    this.correlationDescriptions = {
      strengths: [],
      polarities: []
    };
    this.activeMarker = marker;
    this.otherMarkers.map(otherMarker => {
      const nextCorrelationCoefficient = this.chartDataService.computeLinearCorrelation(this.records, [this.activeMarker, otherMarker]);
      this.correlationCoefficients.push(nextCorrelationCoefficient);
      this.correlationDescriptions.strengths.push(this.getStrengthEnumeration(nextCorrelationCoefficient));
    });
  }

  getStrengthEnumeration(correlationCoefficient: number) {
    if (Math.abs(correlationCoefficient) > 0.67) {
      return 'strongly';
    } else if (Math.abs(correlationCoefficient) > 0.33) {
      return 'moderately';
    } else if (Math.abs(correlationCoefficient) > 0.20) {
      return 'weakly';
    } else {
      return 'not significantly';
    }
  }

  getResults(correlationCoefficient: number): any {
    if (typeof correlationCoefficient === 'number') {
      return [{
        name: 'strength of relationship',
        value: correlationCoefficient
      }];
    }
  }
}
