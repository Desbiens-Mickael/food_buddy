import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/Buisness';
import { UpdateUser } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlRegister = `${environment.apiUrl}/auth/users/register`;
  private apiUrlUpdate = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlRegister, user);
  }

  UpdateUser(updateUser: UpdateUser): Observable<User> {
    return this.http.put<User>(this.apiUrlUpdate, updateUser);
  }
}
