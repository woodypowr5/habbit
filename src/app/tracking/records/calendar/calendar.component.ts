import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() activeDate;
  @Output() monthSelected: EventEmitter<number> = new EventEmitter();
  private currentMonth: number;

  constructor() { }

  ngOnInit() {
    // this.currentMonth = this.activeDate.getMonth();
    // console.log(this.currentMonth);
  }

}
