import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateProduct, FullProduct } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productList = new BehaviorSubject<FullProduct[]>([]);
  productList$ = this.productList.asObservable();

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

  getAllProductsByEstablishmentId(establishmentId: string): void {
    this.http
      .get<
        FullProduct[]
      >(`https://food-buddy.olprog-b.fr/establishment/${establishmentId}/products`)
      .subscribe(products => {
        this.productList.next(products);
      });
  }

  getProductById(
    productId: string,
    establishmentId: string,
  ): Observable<FullProduct> {
    return this.http.get<FullProduct>(
      `https://food-buddy.olprog-b.fr/establishment/${establishmentId}/products/${productId}`,
    );
  }

  updateProduct(
    product: CreateProduct,
    productId: string,
    establishmentId: string,
  ): Observable<CreateProduct> {
    return this.http.put<CreateProduct>(
      `https://food-buddy.olprog-b.fr/establishment/${establishmentId}/products/${productId}`,
      product,
    );
  }

  deleteProduct(productId: string, establishmentId: string): void {
    this.http
      .delete<string>(
        `https://food-buddy.olprog-b.fr/establishment/${establishmentId}/products/${productId}`,
      )
      .subscribe(() => {
        this.getAllProductsByEstablishmentId(establishmentId);
      });
  }
}
