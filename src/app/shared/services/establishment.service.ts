import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfosLinkEstablishment } from '../models/Establishment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private http = inject(HttpClient);

  getAllLinkEstablishments(): Observable<InfosLinkEstablishment[]> {
    return this.http.get<InfosLinkEstablishment[]>(
      'https://food-buddy.olprog-b.fr/establishments',
    );
  }
}
