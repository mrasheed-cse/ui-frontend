import { TestBed, inject } from '@angular/core/testing';

import { IsmsreportService } from './ismsreport.service';

describe('IsmsreportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsmsreportService]
    });
  });

  it('should be created', inject([IsmsreportService], (service: IsmsreportService) => {
    expect(service).toBeTruthy();
  }));
});
