import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserInfo } from '../models/User-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfo = new BehaviorSubject<UserInfo>({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    isAuthenticated: false,
  });
  public userInfo$: Observable<UserInfo> = this.userInfo.asObservable();

  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http
      .post<UserInfo>('https://food-buddy.olprog-b.fr/login', {
        email: email,
        password: password,
      })
      .pipe(
        map(data => {
          this.userInfo.next({ ...data, isAuthenticated: true });
          localStorage.setItem(
            'userInfo',
            JSON.stringify({ ...data, isAuthenticated: true }),
          );
        }),
        // catchError(err => {
        //   console.error('Erreur lors de la connexion:', err);
        //   return throwError(() => new Error('Erreur lors de la connexion.')); // Renvoie l'erreur pour que le composant puisse la gérer.
        // }),
      );
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo.next({ ...this.userInfo, ...userInfo });
  }

  logout() {
    return this.http.post('https://food-buddy.olprog-b.fr/logout', {}).pipe(
      map(() => {
        this.userInfo.next({
          ...this.userInfo.getValue(),
          isAuthenticated: false,
        });
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ isAuthenticated: false }),
        );
      }),
    );
  }
}
