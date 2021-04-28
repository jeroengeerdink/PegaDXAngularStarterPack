import { TestBed, inject } from '@angular/core/testing';

import { PageInstructionsService } from './pageinstructions.service';

describe('PageInstructionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageInstructionsService]
    });
  });

  it('should be created', inject([PageInstructionsService], (service: PageInstructionsService) => {
    expect(service).toBeTruthy();
  }));
});
