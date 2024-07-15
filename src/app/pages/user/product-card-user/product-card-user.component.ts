import { Component, Input, OnInit } from '@angular/core';
import { FullProduct } from '../../../shared/models/Product';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-product-card-user',
  standalone: true,
  imports: [],
  templateUrl: './product-card-user.component.html',
  styleUrl: './product-card-user.component.css',
})
export class ProductCardUserComponent implements OnInit {
  @Input() product!: FullProduct;
  userInfos!: User;
  ngOnInit(): void {
    this.userInfos = JSON.parse(localStorage.getItem('userInfo') ?? '') as User;
    console.log(this.userInfos);
  }

  sendProduct(id: string) {
    console.log(id);
  }
}
