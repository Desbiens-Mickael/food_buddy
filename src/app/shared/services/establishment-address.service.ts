import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Address, EstablishmentAdress } from '../models/EstablishmentAdress';

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

  getAddressById(id: number): Observable<Address | null> {
    return this.http.get<Address | null>(
      `${environment.apiUrl}/establishmentAddresses/${String(id)}`,
    );
  }

  updateAddress(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(
      `${environment.apiUrl}/establishmentAddresses/${String(id)}`,
      address,
    );
  }
}
