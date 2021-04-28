import { TestBed, inject } from '@angular/core/testing';

import { ProgressSpinnerService } from './progressspinner.service';

describe('ProgressspinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressSpinnerService]
    });
  });

  it('should be created', inject([ProgressSpinnerService], (service: ProgressSpinnerService) => {
    expect(service).toBeTruthy();
  }));
});
