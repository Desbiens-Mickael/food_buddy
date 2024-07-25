import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserInfo } from '../models/User-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfo = new BehaviorSubject<UserInfo | null>(null);
  public userInfo$: Observable<UserInfo | null> = this.userInfo.asObservable();

  private http = inject(HttpClient);

  login(email: string, password: string): Observable<UserInfo> {
    return this.http
      .post<UserInfo>(`${environment.apiUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map(data => {
          this.userInfo.next({ ...data });
          console.log(this.userInfo);
          return data;
        }),
      );
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo.next(userInfo);
  }

  refreshUserInfo(update: Partial<UserInfo>) {
    const currentUserInfo = this.userInfo.getValue();
    if (currentUserInfo) {
      const updatedUserInfo = { ...currentUserInfo, ...update };
      this.userInfo.next(updatedUserInfo);
    }
  }

  isAuthenticated(): boolean {
    return !!this.userInfo.getValue()?.email;
  }

  logout() {
    return this.http
      .post<{ message: string }>(`${environment.apiUrl}/auth/logout`, {})
      .pipe(
        map(() => {
          //vider le behavior subject
          this.userInfo.next(null);
        }),
      );
  }
}
