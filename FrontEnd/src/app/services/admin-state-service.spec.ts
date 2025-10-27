import { TestBed } from '@angular/core/testing';

import { AdminStateService } from './admin-state-service';

describe('AdminStateService', () => {
  let service: AdminStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
