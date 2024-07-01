import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/Buisness';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://food-buddy.olprog-b.fr/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
