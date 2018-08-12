import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Marker } from '../../../../shared/types/marker.model';

@Component({
  selector: 'app-confirm-removal',
  templateUrl: './confirm-removal.component.html',
  styleUrls: ['./confirm-removal.component.css']
})
export class ConfirmRemovalComponent implements OnInit {
  @Output() closeDialog: EventEmitter<Marker> = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public marker: any) { }

  ngOnInit() {}

  confirm() {
    this.closeDialog.emit(this.marker);
  }
}
