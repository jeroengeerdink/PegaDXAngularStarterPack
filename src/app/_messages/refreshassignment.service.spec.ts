import { TestBed, inject } from '@angular/core/testing';

import { RefreshAssignmentService } from './refreshassignment.service';

describe('RefreshAssignmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshAssignmentService]
    });
  });

  it('should be created', inject([RefreshAssignmentService], (service: RefreshAssignmentService) => {
    expect(service).toBeTruthy();
  }));
});
