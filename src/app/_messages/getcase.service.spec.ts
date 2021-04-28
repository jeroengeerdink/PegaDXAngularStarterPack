import { TestBed, inject } from '@angular/core/testing';

import { GetCaseService } from './getcase.service';

describe('GetCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCaseService]
    });
  });

  it('should be created', inject([GetCaseService], (service: GetCaseService) => {
    expect(service).toBeTruthy();
  }));
});
