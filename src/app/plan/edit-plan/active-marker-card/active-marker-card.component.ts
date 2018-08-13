import { Marker } from './../../../shared/types/marker.model';
import { ConfirmRemovalComponent } from './confirm-removal/confirm-removal.component';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';
import { Plan } from '../../plan.model';
import { Overlay } from '../../../../../node_modules/@angular/cdk/overlay';

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
  dialogRef: MatDialogRef<ConfirmRemovalComponent>;

  constructor(public dialog: MatDialog, private overlay: Overlay) {}

  ngOnInit(): void { }

  removeMarkerFromPlan(marker): void {
    this.markerRemovedFromPlan.emit(marker);
  }

  openDialog(marker: Marker): void {
    this.dialogRef = this.dialog.open(ConfirmRemovalComponent, {
      data: {
        marker: marker
      },
      scrollStrategy: this.overlay.scrollStrategies.noop()});
    const sub = this.dialogRef.componentInstance.closeDialog.subscribe((thisMarker: Marker) => {
      this.removeMarkerFromPlan(marker);
      this.dialog.closeAll();
    });
  }
}
