import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(1500 )
      ]),
      transition(':leave',
        animate(1500, style({opacity: 0})))
    ])
  ]
})
export class HomeCarouselComponent implements OnInit, OnDestroy {
  @Input() speed: number;
  private slideNum = 0;
  private numSlides = 3;
  private intervalTime = 6500;
  private timer: any;
  constructor() { }

  ngOnInit() {
    this.activate();
  }

  ngOnDestroy() {
    this.deactivate();
  }

  activate(): void {
    const that = this;
    this.timer = window.setInterval(function() {
      that.nextSlide();
    }, this.intervalTime);
  }

  nextSlide(): void {
    this.slideNum++;
    if (this.slideNum > 3) {
      this.slideNum = 0;
    }
  }

  setSlide(slideNum: number): void {
    this.slideNum = slideNum;
    this.deactivate();
  }

  deactivate(): void {
    clearInterval(this.timer);
  }
}
