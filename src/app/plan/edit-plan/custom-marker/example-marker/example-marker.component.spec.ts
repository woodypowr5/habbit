import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleMarkerComponent } from './example-marker.component';

describe('ExampleMarkerComponent', () => {
  let component: ExampleMarkerComponent;
  let fixture: ComponentFixture<ExampleMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
