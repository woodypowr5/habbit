import { Component, OnInit, Input } from '@angular/core';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 400,
  touchendHideDelay: 200,
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
  @Input() displayText;
  @Input() id;

  constructor() { }

  ngOnInit() {
  }

}
