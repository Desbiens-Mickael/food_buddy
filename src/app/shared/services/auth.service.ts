import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { UserInfo } from '../models/User-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  /**
   * Logs in a user with the provided email and password.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   */
  login(email: string, password: string) {
    return this.http
      .post<UserInfo>('https://food-buddy.olprog-b.fr/login', {
        email: email,
        password: password,
      })
      .pipe(
        map(data => {
          const userInfo: UserInfo = { ...data, isAuthenticated: true };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }),
        // catchError(err => {
        //   console.error('Erreur lors de la connexion:', err);
        //   return throwError(() => new Error('Erreur lors de la connexion.')); // Renvoie l'erreur pour que le composant puisse la gérer.
        // }),
      );
  }

  logout() {
    this.http.post('https://food-buddy.olprog-b.fr/logout', {});
    localStorage.removeItem('userInfo');
  }
}
