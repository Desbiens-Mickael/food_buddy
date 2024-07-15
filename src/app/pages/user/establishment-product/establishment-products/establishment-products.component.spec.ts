import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentProductsComponent } from './establishment-products.component';

describe('EstablishmentProductsComponent', () => {
  let component: EstablishmentProductsComponent;
  let fixture: ComponentFixture<EstablishmentProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EstablishmentProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
