import { TestBed, inject } from '@angular/core/testing';

import { CustomspinnerServiceService } from './customspinner-service.service';

describe('CustomspinnerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomspinnerServiceService]
    });
  });

  it('should be created', inject([CustomspinnerServiceService], (service: CustomspinnerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
