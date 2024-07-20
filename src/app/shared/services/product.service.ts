import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateProduct, FullProduct } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productList = new ReplaySubject<FullProduct[]>(1);
  productList$ = this.productList.asObservable();

  private http = inject(HttpClient);

  createProduct(
    product: CreateProduct,
    establishmentId: string,
  ): Observable<CreateProduct> {
    return this.http.post<CreateProduct>(
      `${environment.apiUrl}/establishments/${establishmentId}/products`,
      product,
    );
  }

  getAllProductsByEstablishmentId(establishmentId: string): void {
    this.http
      .get<
        FullProduct[]
      >(`${environment.apiUrl}/establishments/${establishmentId}/products`)
      .subscribe(products => {
        this.productList.next(products);
      });
  }

  getProductById(
    productId: string,
    establishmentId: string,
  ): Observable<FullProduct> {
    return this.http.get<FullProduct>(
      `${environment.apiUrl}/establishments/${establishmentId}/products/${productId}`,
    );
  }

  updateProduct(
    product: CreateProduct,
    productId: string,
    establishmentId: string,
  ): Observable<CreateProduct> {
    return this.http.put<CreateProduct>(
      `${environment.apiUrl}/establishments/${establishmentId}/products/${productId}`,
      product,
    );
  }

  deleteProduct(productId: string, establishmentId: string): void {
    this.http
      .delete<string>(
        `${environment.apiUrl}/establishments/${establishmentId}/products/${productId}`,
      )
      .subscribe(() => {
        this.getAllProductsByEstablishmentId(establishmentId);
      });
  }
}
