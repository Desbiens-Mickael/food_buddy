import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FullProduct } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-card-merchant',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-card-merchant.component.html',
  styleUrl: './product-card-merchant.component.css',
})
export class ProductCardMerchantComponent {
  @Input()
  product!: FullProduct;

  @Input()
  establishmentId!: string;

  private productService = inject(ProductService);
  private router = inject(Router);

  deleteProduct() {
    this.productService.deleteProduct(this.product.id, this.establishmentId);
  }
}
