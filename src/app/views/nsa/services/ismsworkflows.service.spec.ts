import { TestBed, inject } from '@angular/core/testing';

import { IsmsworkflowsService } from './ismsworkflows.service';

describe('IsmsworkflowsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsmsworkflowsService]
    });
  });

  it('should be created', inject([IsmsworkflowsService], (service: IsmsworkflowsService) => {
    expect(service).toBeTruthy();
  }));
});
