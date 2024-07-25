import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FullProduct } from '../../../shared/models/Product';
import { UserInfo } from '../../../shared/models/User-info.model';
import { AuthService } from '../../../shared/services/auth.service';
import { DetailsCardProductComponent } from '../../details-card-product/details-card-product.component';
import { ParticipateButtonComponent } from '../../ui/participate-button/participate-button.component';
import { PaymentButtonComponent } from '../../ui/payment-button/payment-button.component';
import { ReservationButtonComponent } from '../../ui/reservation-button/reservation-button.component';

@Component({
  selector: 'app-product-card-user',
  standalone: true,
  imports: [
    CommonModule,
    ReservationButtonComponent,
    ParticipateButtonComponent,
    PaymentButtonComponent,
    DetailsCardProductComponent,
  ],
  templateUrl: './product-card-user.component.html',
  styleUrl: './product-card-user.component.css',
})
export class ProductCardUserComponent implements OnInit {
  @Input() product!: FullProduct;
  userInfos!: UserInfo | null;
  baseUrl = environment.apiUrl;
  productUrl = '';

  private authService = inject(AuthService);

  ngOnInit(): void {
    if (this.product.imageUrl) {
      this.productUrl = `${this.baseUrl}/establishments/${this.product.establishmentId}/products/product-image/${this.product.imageUrl}`;
    }
    this.authService.userInfo$.subscribe(userInfo => {
      this.userInfos = userInfo;
    });
  }
}
