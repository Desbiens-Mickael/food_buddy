import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

/**
 * Logout button
 * @param buttonSyle ( boolean ) - A style that looks like a button.
 * @param isMobile ( boolean ) A style for mobile phones that only displays the icon.
 * @description
 * This component is used to display a logout button, which by default takes the form of a link.This component is used to display a logout button.
 */
@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
})
export class LogoutButtonComponent {
  @Input()
  buttonSyle = false;

  @Input()
  isMobile = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  handleLogout() {
    this.authService.logout().subscribe(() => {
      void this.router.navigate(['/']);
    });
  }
}
