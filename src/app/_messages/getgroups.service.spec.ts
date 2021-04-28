import { TestBed, inject } from '@angular/core/testing';

import { GetGroupsService } from './getgroups.service';

describe('GetGroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetGroupsService]
    });
  });

  it('should be created', inject([GetGroupsService], (service: GetGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
