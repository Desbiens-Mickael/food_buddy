import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Allergen } from '../models/Allergen';

@Injectable({
  providedIn: 'root',
})
export class AllergenService {
  private http = inject(HttpClient);

  getAllAllergens(): Observable<Allergen[]> {
    return this.http.get<Allergen[]>(
      'https://food-buddy.olprog-b.fr/allergens',
    );
  }
}
