import { TestBed, inject } from '@angular/core/testing';

import { OpenAssignmentService } from './openassignment.service';

describe('OpenAssignmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenAssignmentService]
    });
  });

  it('should be created', inject([OpenAssignmentService], (service: OpenAssignmentService) => {
    expect(service).toBeTruthy();
  }));
});
