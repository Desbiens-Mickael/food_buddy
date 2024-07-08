import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  constructor(private http: HttpClient) {}

  getProductsByEstablishmentId(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `https://food-buddy.olprog-b.fr/establishments/${id}`,
    );
  }
}
