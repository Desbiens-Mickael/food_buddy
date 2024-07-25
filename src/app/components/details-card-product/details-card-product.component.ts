import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FullProduct } from '../../shared/models/Product';
import { UserInfo } from '../../shared/models/User-info.model';
import { AuthService } from '../../shared/services/auth.service';
import { AllergenBadgeComponent } from '../ui/allergen-badge/allergen-badge.component';
import { ParticipateButtonComponent } from '../ui/participate-button/participate-button.component';
import { PaymentButtonComponent } from '../ui/payment-button/payment-button.component';
import { ReservationButtonComponent } from '../ui/reservation-button/reservation-button.component';
import { environment } from '../../../environments/environment';

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
  userInfos!: UserInfo | null;
  @Input() product!: FullProduct;
  isOpen = false;
  productUrl = '';

  private authService = inject(AuthService);

  ngOnInit(): void {
    if (this.product.imageUrl) {
      this.productUrl = `${environment.apiUrl}/establishments/${this.product.establishmentId}/products/product-image/${this.product.imageUrl}`;
    }
    this.authService.userInfo$.subscribe(userInfo => {
      this.userInfos = userInfo;
    });
    // this.userInfos = JSON.parse(localStorage.getItem('userInfo') ?? '') as User;
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
