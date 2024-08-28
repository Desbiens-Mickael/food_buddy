import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductCardUserComponent } from '../../../../components/product/product-card-user/product-card-user.component';
import { FullProduct } from '../../../../shared/models/Product';
import { ProductService } from '../../../../shared/services/product.service';
import { LoaderComponent } from '../../../../components/loader/loader.component';

@Component({
  selector: 'app-establishment-products',
  standalone: true,
  imports: [CommonModule, ProductCardUserComponent, LoaderComponent],
  templateUrl: './establishment-products.component.html',
  styleUrls: ['./establishment-products.component.css'],
})
export class EstablishmentProductsComponent implements OnInit {
  products: FullProduct[] = [];
  isLoading = true;
  id!: string;
  private productService = inject(ProductService);
  private router = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id') ?? '';

    this.productService.getAllProductsByEstablishmentId(this.id);

    this.productService.productList$.subscribe({
      next: data => {
        this.products = data ?? [];
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.error.error_message as string);
        this.isLoading = false;
      },
    });
  }
}
