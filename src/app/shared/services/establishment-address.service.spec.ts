import { TestBed } from '@angular/core/testing';

import { EstablishmentAddressService } from './establishment-address.service';

describe('EstablishmentAddressService', () => {
  let service: EstablishmentAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstablishmentAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
