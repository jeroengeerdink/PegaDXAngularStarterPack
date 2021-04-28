import { TestBed, inject } from '@angular/core/testing';

import { GetViewService } from './getview.service';

describe('GetViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetViewService]
    });
  });

  it('should be created', inject([GetViewService], (service: GetViewService) => {
    expect(service).toBeTruthy();
  }));
});
