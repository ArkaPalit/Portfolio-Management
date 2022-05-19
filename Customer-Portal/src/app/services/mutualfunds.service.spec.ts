import { TestBed } from '@angular/core/testing';

import { MutualfundsService } from './mutualfunds.service';

describe('MutualfundsService', () => {
  let service: MutualfundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutualfundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
