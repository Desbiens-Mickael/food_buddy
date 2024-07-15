import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardUserComponent } from './product-card-user.component';

describe('ProductCardUserComponent', () => {
  let component: ProductCardUserComponent;
  let fixture: ComponentFixture<ProductCardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
