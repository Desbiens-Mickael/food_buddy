import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardMerchantComponent } from './reservation-card-merchant.component';

describe('ReservationCardMerchantComponent', () => {
  let component: ReservationCardMerchantComponent;
  let fixture: ComponentFixture<ReservationCardMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationCardMerchantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationCardMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
