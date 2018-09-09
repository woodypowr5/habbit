import { Constants } from '../../data/constants';
import { Component, OnInit, Input } from '@angular/core';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 200,
  touchendHideDelay: 100,
};

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})
export class TooltipComponent implements OnInit {
  @Input() displayText: string;
  @Input() id: string;
  @Input() type: string;
  private iconCategory = 'description';
  private allTypes = Constants.tooltipTypes;

  constructor() { }

  ngOnInit() {
    if (this.type.length > 0) {
      this.iconCategory = this.type;
    }
  }
}
