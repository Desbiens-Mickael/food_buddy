import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Establishment } from '../models/Buisness';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private establishments = new BehaviorSubject<Establishment[]>([]);
  public establishments$ = this.establishments.asObservable();

  private EstablishmentUrl = `${environment.apiUrl}/establishments`;
  private http = inject(HttpClient);

  getEstablishments(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(this.EstablishmentUrl).pipe(
      tap(data => {
        this.establishments.next(data);
      }),
      switchMap(() => this.establishments$),
    );
  }

  updateEstablishment(
    establishment: Establishment,
    id: string,
  ): Observable<Establishment> {
    return this.http
      .put<Establishment>(this.EstablishmentUrl + `/${id}`, establishment)
      .pipe(
        tap(data => {
          this.establishments.next(
            this.establishments.getValue().map(establishment => {
              if (establishment.id === data.id) {
                return data;
              }
              return establishment;
            }),
          );
        }),
      );
  }

  //TODO : add establishment

  //TODO : delete establishment
}
