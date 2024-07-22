import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullProduct } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';
import { DeleteProductButtonComponent } from '../../ui/delete-product-button/delete-product-button.component';

@Component({
  selector: 'app-product-card-merchant',
  standalone: true,
  imports: [CommonModule, RouterModule, DeleteProductButtonComponent],
  templateUrl: './product-card-merchant.component.html',
  styleUrls: ['./product-card-merchant.component.css'],
})
export class ProductCardMerchantComponent {
  @Input() product!: FullProduct;
  @Input() establishmentId!: string;

  private productService = inject(ProductService);

  deleteProduct() {
    this.productService.deleteProduct(this.product.id, this.establishmentId);
  }
}
