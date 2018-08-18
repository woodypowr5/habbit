import { Plan } from './../../../plan/plan.model';
import { DateService } from './../../../shared/services/date.service';
import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  @ViewChild('presentationArea')presentationArea: ElementRef;
  @Input() data: any;
  @Input() plan: Plan;
  @Input() seriesState: string[];
  private prunedData: any;
  private seriesData: any = {};
  private numDaysVisible = 20;
  private activeDateIndex: number;
  private prevArrowAvailable = false;
  private nextArrowAvailable = false;
  private currentDateIndex;
  private dimensions = {
    containerWidth: null,
    containerHeight: null,
    cellWidth: 50,
    cellHeight: null,
    rowHeight: null,
    dateRowHeight: null,
    nameCellWidth: null
  };

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.seriesData = this.addMissingDays(this.data);
    this.activeDateIndex = this.seriesData.date.length - this.numDaysVisible;
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
    while (currentDate <= this.dateService.getNextDay(today)) {
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

  onResize(event: any): void {
    this.calculateDimensions();
  }

  calculateDimensions(): void {
    this.numDaysVisible = 20;
    this.dimensions.containerWidth = this.presentationArea.nativeElement.offsetWidth - 25; // padding
    this.dimensions.containerHeight = this.presentationArea.nativeElement.offsetHeight - 30;
    if (this.dimensions.containerWidth < 800 ) {
      this.numDaysVisible = 10;
    }
    this.dimensions.nameCellWidth = 240.0;
    this.dimensions.dateRowHeight = 100.0;
    const remainderX = this.dimensions.containerWidth - this.dimensions.nameCellWidth;
    const remainderY = this.dimensions.containerHeight - this.dimensions.dateRowHeight;
    this.dimensions.rowHeight = Math.floor(remainderY / this.seriesState.length);
    this.dimensions.cellWidth = Math.floor(remainderX / this.numDaysVisible);
  }

  nextPage(): void {
    if (this.activeDateIndex + this.numDaysVisible >= this.seriesData.date.length - this.numDaysVisible) {
      this.activeDateIndex = this.seriesData.date.length - this.numDaysVisible;
    } else {
      this.activeDateIndex = this.activeDateIndex + this.numDaysVisible;
    }
  }

  prevPage(): void {
    if (this.currentDateIndex - this.numDaysVisible > 0) {
      this.activeDateIndex = this.activeDateIndex - (this.activeDateIndex - this.numDaysVisible);
    } else {
      this.activeDateIndex = 0;
    }
  }
}
