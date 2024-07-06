import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  createProduct(product: Product) {
    return this.http.post<Product>(
      'https://food-buddy.olprog-b.fr/products',
      product,
    );
  }
}
