import { TestBed, inject } from '@angular/core/testing';

import { OpenNewCaseService } from './opennewcase.service';

describe('OpenNewCaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenNewCaseService]
    });
  });

  it('should be created', inject([OpenNewCaseService], (service: OpenNewCaseService) => {
    expect(service).toBeTruthy();
  }));
});
