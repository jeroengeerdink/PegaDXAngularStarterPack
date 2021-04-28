import { TestBed, inject } from '@angular/core/testing';

import { RefreshWorkListService } from './refreshworklist.service';

describe('RefreshWorkListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshWorkListService]
    });
  });

  it('should be created', inject([RefreshWorkListService], (service: RefreshWorkListService) => {
    expect(service).toBeTruthy();
  }));
});
