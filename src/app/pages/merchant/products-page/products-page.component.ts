import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { ProductCardMerchantComponent } from '../../../components/product/product-card-merchant/product-card-merchant.component';
import { FullProduct } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductCardMerchantComponent, LoaderComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  productList: FullProduct[] = [];
  establishmentId!: string;
  loading = true;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.establishmentId = this.route.snapshot.paramMap.get('id') ?? '';
    this.productService.getAllProductsByEstablishmentId(this.establishmentId);
    this.productService.productList$.subscribe(data => {
      this.productList = data ?? [];
    });
    this.loading = false;
  }
}
