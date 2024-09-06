import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private businessApiUrl = `${this.apiUrl}/auth/merchants/register`;

  constructor(private http: HttpClient) {}

  createBuisnessAccount(
    buisnessAccount: BusinessAccount,
  ): Observable<BusinessWithEstablishment> {
    return this.http.post<BusinessWithEstablishment>(
      this.businessApiUrl,
      buisnessAccount,
    );
  }

  // TODO: Get infos de l'entreprise
  getBusiness(): Observable<Business> {
    return this.http.get<Business>(`${this.apiUrl}/business`);
  }

  // TODO: Transformer en update
  createBuisness(business: Business): Observable<BusinessWithEstablishment> {
    return this.http.post<BusinessWithEstablishment>(
      this.businessApiUrl,
      business,
    );
  }

  uploadBusinessLogo(file: File, businessId: string) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      `${this.apiUrl}/businesses/upload-logo/${businessId}`,
      formData,
    );
  }
}
