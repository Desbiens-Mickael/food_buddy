import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationButtonComponent } from './reservation-button.component';

describe('ButtonComponent', () => {
  let component: ReservationButtonComponent;
  let fixture: ComponentFixture<ReservationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
