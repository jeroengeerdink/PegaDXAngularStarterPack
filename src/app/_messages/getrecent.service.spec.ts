import { TestBed, inject } from '@angular/core/testing';

import { GetRecentService } from './getrecent.service';

describe('GetRecentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRecentService]
    });
  });

  it('should be created', inject([GetRecentService], (service: GetRecentService) => {
    expect(service).toBeTruthy();
  }));
});
