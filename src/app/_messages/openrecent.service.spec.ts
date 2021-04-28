import { TestBed, inject } from '@angular/core/testing';

import { OpenRecentService } from './openrecent.service';

describe('OpenRecentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenRecentService]
    });
  });

  it('should be created', inject([OpenRecentService], (service: OpenRecentService) => {
    expect(service).toBeTruthy();
  }));
});
