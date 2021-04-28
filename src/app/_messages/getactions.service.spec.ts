import { TestBed, inject } from '@angular/core/testing';

import { GetActionsService } from './getactions.service';

describe('GetActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetActionsService]
    });
  });

  it('should be created', inject([GetActionsService], (service: GetActionsService) => {
    expect(service).toBeTruthy();
  }));
});
