import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buisness } from '../../shared/models/Buisness';

@Injectable({
  providedIn: 'root',
})
export class BuisnessService {
  private apiUrl = 'https://food-buddy.olprog-b.fr/merchants/';

  constructor(private http: HttpClient) {}

  createBuisness(buisness: Buisness): Observable<Buisness> {
    return this.http.post<Buisness>(this.apiUrl, buisness);
  }
}
