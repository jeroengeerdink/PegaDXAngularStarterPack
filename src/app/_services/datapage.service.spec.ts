import { TestBed, inject } from '@angular/core/testing';

import { DatapageService } from './datapage.service';

describe('DatapageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatapageService]
    });
  });

  it('should be created', inject([DatapageService], (service: DatapageService) => {
    expect(service).toBeTruthy();
  }));
});
