import { TestBed, inject } from '@angular/core/testing';

import { GetChangesService } from './getchanges.service';

describe('GetchangesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetChangesService]
    });
  });

  it('should be created', inject([GetChangesService], (service: GetChangesService) => {
    expect(service).toBeTruthy();
  }));
});
