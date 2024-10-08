import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateProduct, FullProduct } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productList = new ReplaySubject<FullProduct[] | null>(1);
  productList$ = this.productList.asObservable();

  private http = inject(HttpClient);

  createProduct(
    product: CreateProduct,
    establishmentId: string,
  ): Observable<FullProduct> {
    return this.http.post<FullProduct>(
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

  getAllProducts(establishmentId: string): Observable<FullProduct[] | null> {
    this.getAllProductsByEstablishmentId(establishmentId);
    return this.productList$;
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
  ): Observable<FullProduct> {
    return this.http.put<FullProduct>(
      `${environment.apiUrl}/establishments/${establishmentId}/products/${productId}`,
      product,
    );
  }

  uploadProductImage(
    productId: string,
    establishmentId: string,
    file: File,
  ): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(
      `${environment.apiUrl}/establishments/${establishmentId}/products/${productId}/upload-image`,
      formData,
    );
  }

  deleteProduct(
    productId: string,
    establishmentId: string,
  ): Observable<string> {
    return this.http
      .delete<string>(
        `${environment.apiUrl}/establishments/${establishmentId}/products/${productId}`,
      )
      .pipe(
        map(() => {
          this.getAllProductsByEstablishmentId(establishmentId);
          return 'Product deleted';
        }),
        catchError(() => {
          return of('Error deleting product');
        }),
      );
  }
}
