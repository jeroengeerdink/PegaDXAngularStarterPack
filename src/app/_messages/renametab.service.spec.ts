import { TestBed, inject } from '@angular/core/testing';

import { RenameTabService } from './renametab.service';

describe('RenameTabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenameTabService]
    });
  });

  it('should be created', inject([RenameTabService], (service: RenameTabService) => {
    expect(service).toBeTruthy();
  }));
});
