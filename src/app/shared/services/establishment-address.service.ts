import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EstablishmentAdress } from '../models/EstablishmentAdress';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentAddressService {
  private http = inject(HttpClient);

  findAllAddresses(): Observable<EstablishmentAdress[]> {
    return this.http.get<EstablishmentAdress[]>(
      'https://food-buddy.olprog-b.fr/establishmentAddresses',
    );
  }
}
