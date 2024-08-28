import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdresseJson } from '../models/AdresseJson';

@Injectable({
  providedIn: 'root',
})
export class AdresseService {
  constructor(private http: HttpClient) {}
  getAdresse(name: string, limit: string): Observable<AdresseJson> {
    const nameformat = name.toLowerCase().replaceAll(' ', '+');
    return this.http.get<AdresseJson>(
      `https://api-adresse.data.gouv.fr/search/?q=${nameformat}&limit=${limit}`,
    );
  }
}
