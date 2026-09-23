import { TestBed, inject } from '@angular/core/testing';

import { DefinitionDataService } from './definitiondata.service';

describe('DefinitionDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefinitionDataService]
    });
  });

  it('should be created', inject([DefinitionDataService], (service: DefinitionDataService) => {
    expect(service).toBeTruthy();
  }));
});
