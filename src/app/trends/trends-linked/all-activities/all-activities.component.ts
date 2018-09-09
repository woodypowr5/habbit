import { Correlation } from './../../../shared/types/correlation';
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
  private correlations: Correlation[];
  private activeCorrelation: Correlation = null;
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
    this.correlations = [];
    this.activeMarker = marker;
    this.otherMarkers.map(otherMarker => {
      const nextCorrelationCoefficient = this.chartDataService.computeLinearCorrelation(this.records, [this.activeMarker, otherMarker]);
      this.correlationCoefficients.push(nextCorrelationCoefficient);
      this.correlations.push({
        marker: otherMarker,
        coefficient: nextCorrelationCoefficient
      });
    });
  }
  
  setActiveCorrelation(correlation: Correlation) {
    console.log(correlation)
    this.activeCorrelation = correlation;
  }
}
