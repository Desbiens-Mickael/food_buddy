import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FullProduct } from '../../../shared/models/Product';
import { User } from '../../../shared/models/User';
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
  userInfos!: User;

  ngOnInit(): void {
    this.userInfos = JSON.parse(localStorage.getItem('userInfo') ?? '') as User;
  }
}
