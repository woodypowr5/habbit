import { ChartDataService } from './../../../shared/services/chart-data.service';
import { Marker } from './../../../shared/types/marker.model';
import { Plan } from './../../../plan/plan.model';
import { Component, OnInit, Input } from '@angular/core';
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
    this.activeMarker = marker;
    this.otherMarkers.map(otherMarker => {
      this.correlationCoefficients.push(this.chartDataService.computeLinearCorrelation(this.records, [this.activeMarker, otherMarker]));
    });
  }
}
