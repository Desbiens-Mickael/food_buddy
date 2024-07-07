import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProduct, FullProduct } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  createProduct(
    product: CreateProduct,
    establishmentId: string,
  ): Observable<CreateProduct> {
    return this.http.post<CreateProduct>(
      `https://food-buddy.olprog-b.fr/establishment/${establishmentId}/products`,
      product,
    );
  }

  getAllProductsByEstablishmentId(
    establishmentId: string,
  ): Observable<FullProduct[]> {
    return this.http.get<FullProduct[]>(
      `https://food-buddy.olprog-b.fr/establishment/${establishmentId}/products`,
    );
  }

  getProductById(
    productId: string,
    establishmentId: string,
  ): Observable<FullProduct> {
    return this.http.get<FullProduct>(
      `https://food-buddy.olprog-b.fr/establishment/${establishmentId}/products/${productId}`,
    );
  }

  deleteProduct(
    productId: string,
    establishmentId: string,
  ): Observable<string> {
    return this.http.delete<string>(
      `https://food-buddy.olprog-b.fr/establishment/${establishmentId}/products/${productId}`,
    );
  }
}
