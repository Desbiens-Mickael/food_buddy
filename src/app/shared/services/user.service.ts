import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/User';
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

  getUser(): Observable<UserInfo | null> {
    return this.http.get<UserInfo>(`${this.apiUrluser}/me`).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si l'utilisateur n'est pas authentifié (erreur 401), on renvoie null plutôt qu'une erreur
        if (error.status === 401) {
          return of(null);
        }

        return throwError(() => error);
      }),
    );
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
