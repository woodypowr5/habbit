import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsDailyComponent } from './trends-daily.component';

describe('TrendsDailyComponent', () => {
  let component: TrendsDailyComponent;
  let fixture: ComponentFixture<TrendsDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendsDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
