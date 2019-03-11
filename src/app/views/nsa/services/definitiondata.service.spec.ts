import { TestBed, inject } from '@angular/core/testing';

import { DefinitiondataService } from './definitiondata.service';

describe('DefinitiondataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefinitiondataService]
    });
  });

  it('should be created', inject([DefinitiondataService], (service: DefinitiondataService) => {
    expect(service).toBeTruthy();
  }));
});
