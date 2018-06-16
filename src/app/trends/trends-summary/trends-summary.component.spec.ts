import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsSummaryComponent } from './trends-summary.component';

describe('TrendsSummaryComponent', () => {
  let component: TrendsSummaryComponent;
  let fixture: ComponentFixture<TrendsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
