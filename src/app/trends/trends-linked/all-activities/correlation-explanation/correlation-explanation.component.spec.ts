import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationExplanationComponent } from './correlation-explanation.component';

describe('CorrelationExplanationComponent', () => {
  let component: CorrelationExplanationComponent;
  let fixture: ComponentFixture<CorrelationExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelationExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelationExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
