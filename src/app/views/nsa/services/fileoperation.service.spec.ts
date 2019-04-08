import { TestBed, inject } from '@angular/core/testing';

import { FileoperationService } from './fileoperation.service';

describe('FileoperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileoperationService]
    });
  });

  it('should be created', inject([FileoperationService], (service: FileoperationService) => {
    expect(service).toBeTruthy();
  }));
});
