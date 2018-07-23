import { Marker } from '../../../shared/types/marker.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';
import { ActiveMarkerSettingsComponent } from './active-marker-settings/active-marker-settings.component';
import { Plan } from '../../plan.model';

@Component({
  selector: 'app-active-marker-card',
  templateUrl: './active-marker-card.component.html',
  styleUrls: ['./active-marker-card.component.css']
})
export class ActiveMarkerCardComponent implements OnInit {
  @Input() marker: Marker;
  @Input() myPlan: Plan;
  @Input() isInPlan: boolean;
  @Output() markerRemovedFromPlan = new EventEmitter<Marker>();
  dialogRef: MatDialogRef<ActiveMarkerSettingsComponent>;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void { }

  removeMarkerFromPlan(marker): void {
    this.markerRemovedFromPlan.emit(marker);
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(ActiveMarkerSettingsComponent, {
      data: {
        marker: this.marker,
        myPlan: this.myPlan
      }
    });
  }
}
