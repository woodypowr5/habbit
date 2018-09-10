import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-correlation-details',
  templateUrl: './correlation-details.component.html',
  styleUrls: ['./correlation-details.component.css']
})
export class CorrelationDetailsComponent implements OnInit {
  private data: any;

  constructor(
    private dialogRef: MatDialogRef<CorrelationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
  }

  ngOnInit() {
  }

}
