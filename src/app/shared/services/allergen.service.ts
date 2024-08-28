import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergen } from '../models/Allergen';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AllergenService {
  private http = inject(HttpClient);

  getAllAllergens(): Observable<Allergen[]> {
    return this.http.get<Allergen[]>(`${environment.apiUrl}/allergens`);
  }
}
