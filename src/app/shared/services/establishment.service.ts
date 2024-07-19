import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { InfosLinkEstablishment } from '../models/Establishment';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  constructor(private http: HttpClient) {}

  getProductsByEstablishmentId(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiUrl}/establishments/${id}`,
    );
  }
  getAllLinkEstablishments(): Observable<InfosLinkEstablishment[]> {
    return this.http.get<InfosLinkEstablishment[]>(
      `${environment.apiUrl}/establishments`,
    );
  }
}
