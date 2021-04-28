import { TestBed, inject } from '@angular/core/testing';

import { GetLoginStatusService } from './getloginstatus.service';

describe('GetLoginStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetLoginStatusService]
    });
  });

  it('should be created', inject([GetLoginStatusService], (service: GetLoginStatusService) => {
    expect(service).toBeTruthy();
  }));
});
