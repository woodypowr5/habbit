import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordMarkerDetailsComponent } from './record-marker-details.component';

describe('RecordMarkerDetailsComponent', () => {
  let component: RecordMarkerDetailsComponent;
  let fixture: ComponentFixture<RecordMarkerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordMarkerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordMarkerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
