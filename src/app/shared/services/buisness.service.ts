import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Buisness,
  BusinessWithEstablishment,
} from '../../shared/models/Buisness';

@Injectable({
  providedIn: 'root',
})
export class BuisnessService {
  private apiUrl = environment.apiUrl;
  private businessApiUrl = `${this.apiUrl}/auth/merchants/register`;

  constructor(private http: HttpClient) {}

  createBuisness(buisness: Buisness): Observable<BusinessWithEstablishment> {
    return this.http.post<BusinessWithEstablishment>(
      this.businessApiUrl,
      buisness,
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
