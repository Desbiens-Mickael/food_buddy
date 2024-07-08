import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormComponent } from '../../../components/product/product-form/product-form.component';
import { CreateProduct } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-create-product-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './create-product-page.component.html',
  styleUrl: './create-product-page.component.css',
})
export class CreateProductPageComponent implements OnInit {
  establishmentId!: string;

  private productService = inject(ProductService);
  private routerA = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.establishmentId = this.routerA.snapshot.paramMap.get('id') ?? '';
  }

  createProduct(product: CreateProduct) {
    this.productService
      .createProduct(product, this.establishmentId)
      .subscribe(() => {
        this.productService.getAllProductsByEstablishmentId(
          this.establishmentId,
        );
        void this.router.navigate([
          'merchant/establishment',
          this.establishmentId,
          'products',
        ]);
      });
  }
}
