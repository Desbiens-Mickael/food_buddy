import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Business,
  BusinessAccount,
  BusinessWithEstablishment,
} from '../../shared/models/Buisness';

@Injectable({
  providedIn: 'root',
})
export class BuisnessService {
  private apiUrl = environment.apiUrl;
  private businessRegisterApiUrl = `${this.apiUrl}/auth/merchants/register`;
  private businessApiUrl = `${this.apiUrl}/businesses`;

  private businessInfo = new BehaviorSubject<Business | null>(null);
  public businessInfo$: Observable<Business | null> =
    this.businessInfo.asObservable();

  constructor(private http: HttpClient) {}

  createBuisnessAccount(
    buisnessAccount: BusinessAccount,
  ): Observable<BusinessWithEstablishment> {
    return this.http.post<BusinessWithEstablishment>(
      this.businessRegisterApiUrl,
      buisnessAccount,
    );
  }

  getBusiness(): Observable<Business | null> {
    return this.http.get<Business>(this.businessApiUrl).pipe(
      tap(data => {
        this.businessInfo.next(data); // Met à jour le BehaviorSubject avec la nouvelle donnée
      }),
      switchMap(() => this.businessInfo$), // Retourne l'Observable déjà mis à jour
    );
  }

  updateBuisness(business: Business): Observable<Business> {
    return this.http.put<Business>(this.businessApiUrl, business).pipe(
      map(data => {
        this.businessInfo.next(data);
        return data;
      }),
    );
  }

  uploadBusinessLogo(file: File): Observable<Business> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<Business>(`${this.businessApiUrl}/upload-logo`, formData)
      .pipe(
        map(data => {
          this.businessInfo.next(data);
          return data;
        }),
      );
  }
}
