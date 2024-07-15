import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { InfosLinkEstablishment } from '../models/Establishment';

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
  getAllLinkEstablishments(): Observable<InfosLinkEstablishment[]> {
    return this.http.get<InfosLinkEstablishment[]>(
      'https://food-buddy.olprog-b.fr/establishments',
    );
  }
}
