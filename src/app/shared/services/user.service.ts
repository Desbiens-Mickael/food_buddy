import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/Buisness';
import { UpdateUser } from '../models/User';
import { UserInfo } from '../models/User-info.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrluser = `${environment.apiUrl}/users`;
  private apiUrlRegister = `${environment.apiUrl}/auth/users/register`;

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlRegister, user);
  }

  UpdateUser(updateUser: UpdateUser): Observable<User> {
    return this.http.put<User>(this.apiUrluser, updateUser).pipe(
      tap(user => {
        this.authService.refreshUserInfo(user);
      }),
    );
  }

  getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrluser}/me`);
  }

  uploadAvatar(file: File, userEmail: string): Observable<User> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<User>(`${this.apiUrluser}/upload-avatar/${userEmail}`, formData)
      .pipe(
        tap(user => {
          this.authService.refreshUserInfo(user);
        }),
      );
  }
}
