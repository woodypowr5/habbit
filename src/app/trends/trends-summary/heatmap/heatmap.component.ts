import { Plan } from './../../../plan/plan.model';
import { DateService } from './../../../shared/services/date.service';
import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  @Input() data: any;
  @Input() plan: Plan;
  @Input() seriesState: string[];
  prunedData: any;
  private seriesData: any = {};
  private dimensions = {
    containerWidth: null,
    containerHeight: null,
    cellWidth: 50,
    cellHeight: null,
    rowHeight: null,
    dateRowHeight: null,
    nameCellWidth: null
  };
  private numDaysVisible = 20;
  private activeDate: Date = new Date();

  @ViewChild('presentationArea')presentationArea: ElementRef;

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.seriesData = this.addMissingDays(this.data);
    this.calculateDimensions();
  }

  addMissingDays(data: any): any {
    const completeData = {
      date: [],
      markers: []
    };
    const filteredPlanMarkers = this.plan.markers.filter(marker => marker.dataType === 'boolean');
    filteredPlanMarkers.map(marker => {
      completeData.markers.push({
        name: marker.name,
        measurements: []
      });
    });
    let firstDate: Date = new Date();
    data.map(dayRecord => {
      if (dayRecord.name < firstDate) {
        firstDate = dayRecord.name;
      }
    });
    const today = new Date();
    let currentDate = firstDate;
    let dateIndex = 0;
    while (currentDate < today) {
      completeData.date.push(currentDate);
      filteredPlanMarkers.map((marker, index) => {
        const foundMeasurement = this.findMeasurement(data, marker.name, currentDate);
        if (foundMeasurement === undefined) {
          completeData.markers[index].measurements.push(undefined);
        } else {
          completeData.markers[index].measurements.push(foundMeasurement.value);
        }
      });
      currentDate = this.dateService.getNextDay(currentDate);
      dateIndex++;
    }
    return completeData;
  }

  findMeasurement(data: any, markerName: string, date: Date) {
    const todaysRecord = data.filter(currentDate => this.dateService.isSameDate(currentDate.name, date) === true)[0];
    if (todaysRecord === undefined) {
      return undefined;
    }
    return todaysRecord.series.filter(measurement => measurement.name === markerName)[0];
  }

  onResize(event) {
    this.calculateDimensions();
  }

  calculateDimensions(): void {
    this.numDaysVisible = 20;
    this.dimensions.containerWidth = this.presentationArea.nativeElement.offsetWidth - 20; // padding
    this.dimensions.containerHeight = this.presentationArea.nativeElement.offsetHeight;
    if (this.dimensions.containerWidth < 800 ) {
      this.numDaysVisible = 10;
    }
    if (this.seriesData.date.length > this.numDaysVisible) {
      this.pruneData();
    }
    this.dimensions.nameCellWidth = 240.0;
    this.dimensions.dateRowHeight = 100.0;
    const remainderX = this.dimensions.containerWidth - this.dimensions.nameCellWidth;
    const remainderY = this.dimensions.containerHeight - this.dimensions.dateRowHeight;
    this.dimensions.rowHeight = Math.floor(remainderY / this.plan.markers.length);
    this.dimensions.cellWidth = Math.floor(remainderX / this.numDaysVisible);
  }

  pruneData() {

  }
}
