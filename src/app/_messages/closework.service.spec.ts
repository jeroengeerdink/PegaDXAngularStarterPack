import { TestBed, inject } from '@angular/core/testing';

import { CloseWorkService } from './closework.service';

describe('CloseWorkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CloseWorkService]
    });
  });

  it('should be created', inject([CloseWorkService], (service: CloseWorkService) => {
    expect(service).toBeTruthy();
  }));
});
