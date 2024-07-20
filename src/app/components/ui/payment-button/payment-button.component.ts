import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../shared/models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-button.component.html',
  styleUrl: './payment-button.component.css',
})
export class PaymentButtonComponent implements OnInit {
  userInfos!: User;
  @Input() productId!: string;

  ngOnInit(): void {
    this.userInfos = JSON.parse(localStorage.getItem('userInfo') ?? '') as User;
  }

  handlePayment() {
    console.log('payment', this.productId);
  }
}
