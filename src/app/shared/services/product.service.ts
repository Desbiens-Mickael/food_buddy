import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateProduct } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  createProduct(product: CreateProduct) {
    return this.http.post<CreateProduct>(
      'https://food-buddy.olprog-b.fr/products',
      product,
    );
  }
}
