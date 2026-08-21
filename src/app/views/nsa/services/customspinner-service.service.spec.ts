import { TestBed, inject } from '@angular/core/testing';

import { CustomspinnerService } from './customspinner-service.service';

describe('CustomspinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomspinnerService]
    });
  });

  it('should be created', inject([CustomspinnerService], (service: CustomspinnerService) => {
    expect(service).toBeTruthy();
  }));
});
