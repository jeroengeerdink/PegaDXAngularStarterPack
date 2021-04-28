import { TestBed, inject } from '@angular/core/testing';

import { RefreshCaseService } from './refreshcase.service';

describe('RefreshCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshCaseService]
    });
  });

  it('should be created', inject([RefreshCaseService], (service: RefreshCaseService) => {
    expect(service).toBeTruthy();
  }));
});
