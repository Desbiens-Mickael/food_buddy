import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap } from 'rxjs';
import { ProductFormComponent } from '../../../components/product/product-form/product-form.component';
import { CreateProduct, FullProduct } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-edit-product-page',
  standalone: true,
  imports: [ProductFormComponent, CommonModule],
  templateUrl: './edit-product-page.component.html',
  styleUrl: './edit-product-page.component.css',
})
export class EditProductPageComponent implements OnInit {
  establishmentId!: string;
  productId!: string;
  product!: FullProduct;
  isLoading = true;

  private productService = inject(ProductService);
  private routerA = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit() {
    this.establishmentId =
      this.routerA.snapshot.paramMap.get('establishmentId') ?? '';
    this.productId = this.routerA.snapshot.paramMap.get('id') ?? '';

    this.productService
      .getProductById(this.productId, this.establishmentId)
      .subscribe(data => {
        this.product = data;
        this.isLoading = false;
      });
  }

  updateProduct(product: CreateProduct) {
    this.productService
      .updateProduct(product, this.productId, this.establishmentId)
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
          this.toastr.success('Produit modifié avec succès');
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
    // this.productService
    //   .updateProduct(product, this.productId, this.establishmentId)
    //   .subscribe({
    //     next: () => {
    //       this.productService.getAllProductsByEstablishmentId(
    //         this.establishmentId,
    //       );
    //       this.toastr.success('Produit modifié avec succès');
    //       void this.router.navigate([
    //         'merchant/establishment',
    //         this.establishmentId,
    //         'products',
    //       ]);
    //     },
    //     error: (err: HttpErrorResponse) => {
    //       this.toastr.error(err.error.error_message as string);
    //     },
    //   });
  }
}
