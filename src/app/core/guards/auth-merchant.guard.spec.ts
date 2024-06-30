import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authMerchantGuard } from './auth-merchant.guard';

describe('authMerchantGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authMerchantGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
