import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardUserComponent } from '../../../../components/product/product-card-user/product-card-user.component';
import { FullProduct } from '../../../../shared/models/Product';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-establishment-products',
  standalone: true,
  imports: [CommonModule, ProductCardUserComponent],
  templateUrl: './establishment-products.component.html',
  styleUrls: ['./establishment-products.component.css'],
})
export class EstablishmentProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(ActivatedRoute);
  id!: string;
  products: FullProduct[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id') ?? '';

    this.productService.getAllProductsByEstablishmentId(this.id);
    this.productService.productList$.subscribe(data => {
      this.products = data;
      this.isLoading = false;
    });
  }
}
