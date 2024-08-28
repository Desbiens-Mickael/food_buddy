import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservationList = new ReplaySubject<Reservation[] | null>(1);
  private reservationByCode = new ReplaySubject<Reservation | null>(1);
  reservationList$ = this.reservationList.asObservable();
  reservationByCode$ = this.reservationByCode.asObservable();
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

  getReservationByCode(validationCode: string, establishmentId: string): void {
    this.http
      .get<Reservation>(
        `${environment.apiUrl}/reservations/establishments/${establishmentId}/search/${validationCode}`,
      )
      .subscribe(reservation => {
        this.reservationByCode.next(reservation);
      });
  }

  getAllReservationsByEstablishmentId(
    establishmentId: string,
  ): Observable<Reservation[] | null> {
    this.http
      .get<
        Reservation[]
      >(`${environment.apiUrl}/reservations/establishments/${establishmentId}`)
      .subscribe(reservations => {
        this.reservationList.next(reservations);
      });
    return this.reservationList$;
  }

  deleteReservation(validationCode: string, reservationId: string) {
    return this.http
      .delete(
        `${environment.apiUrl}/reservations/${reservationId}/code/${validationCode}`,
      )
      .subscribe(() => {
        this.reservationByCode.next(null);
      });
  }
}
