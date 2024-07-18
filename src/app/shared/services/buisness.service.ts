import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Buisness } from '../../shared/models/Buisness';

@Injectable({
  providedIn: 'root',
})
export class BuisnessService {
  private apiUrl = `${environment.apiUrl}/auth/merchants/register`;

  constructor(private http: HttpClient) {}

  createBuisness(buisness: Buisness): Observable<Buisness> {
    return this.http.post<Buisness>(this.apiUrl, buisness);
  }
}
