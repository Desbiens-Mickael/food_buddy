import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullProduct } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  productList!: FullProduct[];
  private establishmentId!: string;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.establishmentId = this.route.snapshot.paramMap.get('id') ?? '';
    this.productService
      .getAllProductsByEstablishmentId(this.establishmentId)
      .subscribe(data => {
        this.productList = data;
        console.log(this.productList);
      });
  }
}
