import { TestBed } from '@angular/core/testing';

import { HealtCheckService } from './healt-check.service';

describe('HealtCheckService', () => {
  let service: HealtCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealtCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
