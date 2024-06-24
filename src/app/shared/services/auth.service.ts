import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = true;
  private role = '';
  private email = '';

  login() {
    // TODO : Implement login whith api and add user info in localStorage
    this.isAuthenticated = true;
  }

  logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.role = '';
    this.email = '';
  }

  geIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getRole(): string {
    return this.role;
  }

  getEmail(): string {
    return this.email;
  }
}
