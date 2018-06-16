import { Marker } from './../../../../../shared/marker.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFormRangeComponent } from './entry-form-range.component';

describe('EntryFormRangeComponent', () => {
  const component = new EntryFormRangeComponent();

  component.initialValue = 1;
  component.marker = {
    id: '1',
    name: 'Test Marker',
    dataType: 'range',
    isLoading: false,
    min: 1,
    max:  5
  };

  const expectedNewMeasurement = {
    markerName: 'Test Marker',
    value: 3
  };

  beforeEach(() => {
    component.ngOnInit();
  });

  describe('init', () => {
    it('sliderValue takes the value of intitialValue', () => {
      const actual = component.sliderValue;
      const expected = 1;
      expect(actual).toEqual(expected);
    });
  });

  describe('save()', () => {
    it('saves a new measurement with the current slider value', () => {
      component.saveMeasurement.subscribe(result => {
        expect(component.marker).toBe(result);
      });
    });
    component.save();
  });

  describe('getStepPercentage', () => {
    it('Should return the corresponding percentage value of the slider step value', () => {
      const actual = component.getStepPercentage(1, 11, 1);
      const expected = 10;
      expect(actual).toEqual(expected);
    });
  });


});
