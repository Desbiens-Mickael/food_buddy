import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardMerchantComponent } from './product-card-merchant.component';

describe('ProductCardMerchantComponent', () => {
  let component: ProductCardMerchantComponent;
  let fixture: ComponentFixture<ProductCardMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardMerchantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
