import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-no-record',
  templateUrl: './no-record.component.html',
  styleUrls: ['./no-record.component.css']
})
export class NoRecordComponent implements OnInit {
  @Output() createNewRecord: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  createRecord(): void {
    this.createNewRecord.emit(true);
  }

}
