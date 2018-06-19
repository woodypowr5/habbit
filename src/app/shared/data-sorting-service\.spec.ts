import { TestBed, inject } from '@angular/core/testing';

import { DataSortingServiceService } from './data-sorting-service.service';

describe('DataSortingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSortingServiceService]
    });
  });

  it('should be created', inject([DataSortingServiceService], (service: DataSortingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
