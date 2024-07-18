import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private http = inject(HttpClient);

  createReservation(productId: string): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${environment.apiUrl}/reservations/${productId}`,
      {},
    );
  }

  getAllReservationsByUser(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      `${environment.apiUrl}/reservations/users`,
    );
  }
}
