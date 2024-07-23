import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap } from 'rxjs';
import { ProductFormComponent } from '../../../components/product/product-form/product-form.component';
import { CreateProduct, FullProduct } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  private toastr = inject(ToastrService);

  ngOnInit() {
    this.establishmentId = this.routerA.snapshot.paramMap.get('id') ?? '';
  }

  createProduct(product: CreateProduct) {
    this.productService
      .createProduct(product, this.establishmentId)
      .pipe(
        switchMap((productData: FullProduct) => {
          if (product.ProductImage) {
            return this.productService.uploadProductImage(
              productData.id,
              this.establishmentId,
              product.ProductImage,
            );
          }
          return of(productData);
        }),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.error_message as string);
          return of(error);
        }),
      )
      .subscribe({
        next: () => {
          this.productService.getAllProductsByEstablishmentId(
            this.establishmentId,
          );
          this.toastr.success('Produit créé avec succès');
          void this.router.navigate([
            'merchant/establishment',
            this.establishmentId,
            'products',
          ]);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err.error.error_message as string);
        },
      });
  }
}
