import { Marker } from './../../../../../shared/types/marker.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entry-form-enumerated',
  templateUrl: './entry-form-enumerated.component.html',
  styleUrls: ['./entry-form-enumerated.component.css']
})
export class EntryFormEnumeratedComponent implements OnInit {
  @Input() marker: Marker;

  constructor() { }

  ngOnInit() {}

  save(value) {

  }

}
