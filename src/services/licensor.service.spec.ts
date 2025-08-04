import { TestBed } from '@angular/core/testing';

import { LicensorService } from './licensor.service';

describe('LicensorService', () => {
  let service: LicensorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicensorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
