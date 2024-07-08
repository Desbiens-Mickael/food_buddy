import { TestBed } from '@angular/core/testing';

import { AllergenService } from './allergen.service';

describe('AllergenService', () => {
  let service: AllergenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
