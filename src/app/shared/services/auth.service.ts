import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
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
      .post<UserInfo>(`${environment.apiUrl}/auth/login`, {
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
      );
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo.next({ ...this.userInfo, ...userInfo });
  }

  logout() {
    return this.http
      .post<{ message: string }>(`${environment.apiUrl}/auth/logout`, {})
      .pipe(
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
