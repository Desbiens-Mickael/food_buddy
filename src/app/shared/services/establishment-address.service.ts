import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EstablishmentAdress } from '../models/EstablishmentAdress';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentAddressService {
  private http = inject(HttpClient);

  findAllAddresses(keyword?: string): Observable<EstablishmentAdress[] | null> {
    return this.http.get<EstablishmentAdress[] | null>(
      `${environment.apiUrl}/establishmentAddresses?keyword=${keyword ?? ''}`,
    );
  }
}
