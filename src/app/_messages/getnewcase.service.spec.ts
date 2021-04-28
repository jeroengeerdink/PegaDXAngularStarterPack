import { TestBed, inject } from '@angular/core/testing';

import { GetNewCaseService } from './getnewcase.service';

describe('GetNewCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetNewCaseService]
    });
  });

  it('should be created', inject([GetNewCaseService], (service: GetNewCaseService) => {
    expect(service).toBeTruthy();
  }));
});
