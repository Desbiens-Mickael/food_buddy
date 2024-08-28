import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FullProduct } from '../../../shared/models/Product';
import { AuthService } from '../../../shared/services/auth.service';
import { ProductService } from '../../../shared/services/product.service';
import { DeleteProductButtonComponent } from '../../ui/delete-product-button/delete-product-button.component';

@Component({
  selector: 'app-product-card-merchant',
  standalone: true,
  imports: [CommonModule, RouterModule, DeleteProductButtonComponent],
  templateUrl: './product-card-merchant.component.html',
  styleUrls: ['./product-card-merchant.component.css'],
})
export class ProductCardMerchantComponent implements OnInit {
  businessLogoUrl = '';
  @Input() product!: FullProduct;
  @Input() establishmentId!: string;
  productUrl = '';

  private productService = inject(ProductService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    if (this.product.imageUrl) {
      this.productUrl = `${environment.apiUrl}/establishments/${this.establishmentId}/products/product-image/${this.product.imageUrl}`;
    }
    this.authService.userInfo$.subscribe(userInfo => {
      this.businessLogoUrl = userInfo?.businessLogoUrl
        ? `${environment.apiUrl}/businesses/logo/${userInfo.businessLogoUrl}`
        : '';
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id, this.establishmentId);
  }
}
