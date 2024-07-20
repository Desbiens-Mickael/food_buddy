import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FullProduct } from '../../shared/models/Product';
import { User } from '../../shared/models/User';
import { AllergenBadgeComponent } from '../ui/allergen-badge/allergen-badge.component';
import { ParticipateButtonComponent } from '../ui/participate-button/participate-button.component';
import { PaymentButtonComponent } from '../ui/payment-button/payment-button.component';
import { ReservationButtonComponent } from '../ui/reservation-button/reservation-button.component';

@Component({
  selector: 'app-details-card-product',
  standalone: true,
  imports: [
    CommonModule,
    ReservationButtonComponent,
    PaymentButtonComponent,
    ParticipateButtonComponent,
    AllergenBadgeComponent,
  ],
  templateUrl: './details-card-product.component.html',
  styleUrl: './details-card-product.component.css',
})
export class DetailsCardProductComponent implements OnInit {
  userInfos!: User;
  @Input() product!: FullProduct;
  isOpen = false;

  ngOnInit(): void {
    this.userInfos = JSON.parse(localStorage.getItem('userInfo') ?? '') as User;
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.toggleOpen();
    }
  }
}
