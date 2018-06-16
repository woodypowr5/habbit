import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsLinkedComponent } from './trends-linked.component';

describe('TrendsLinkedComponent', () => {
  let component: TrendsLinkedComponent;
  let fixture: ComponentFixture<TrendsLinkedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendsLinkedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendsLinkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
