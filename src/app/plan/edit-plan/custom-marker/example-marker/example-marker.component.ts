import { Marker } from '../../../../shared/types/marker.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-example-marker',
  templateUrl: './example-marker.component.html',
  styleUrls: ['./example-marker.component.css']
})
export class ExampleMarkerComponent implements OnInit {
  @Input() datatype: string;
  @Input() minLabel: string;
  @Input() maxLabel: string;
  @Input() unit: string;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

  createMarker(datatype: string): Marker {
    if (datatype === 'boolean') {
      return {
          name: datatype,
          dataType: 'boolean',
          category: null,
          iconName: null,
          isLoading: false,
          value1Name: 'No',
          value2Name: 'Yes'
      };
    }
  }
}
