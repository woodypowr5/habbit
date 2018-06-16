import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-active-marker-settings',
  templateUrl: './active-marker-settings.component.html',
  styleUrls: ['./active-marker-settings.component.css']
})
export class ActiveMarkerSettingsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }

}

