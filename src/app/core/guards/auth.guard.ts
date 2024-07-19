import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  let isLogged!: boolean;
  let userRole!: string;

  authService.userInfo$.subscribe(userInfo => {
    isLogged = userInfo.isAuthenticated;
    userRole = userInfo.role;
  });

  const publicRoutes = ['/login', '/register'];
  const userRoutes = ['/profile', '/map', '/favorite'];

  // Unauthenticated user management
  if (!isLogged && userRoutes.includes(state.url)) {
    return router.createUrlTree(['/login']);
  }

  // Authenticated user management for the public route
  if (isLogged && publicRoutes.includes(state.url)) {
    if (userRole === 'MERCHANT') return router.createUrlTree(['/merchant']);

    return router.createUrlTree(['/']);
  }

  // Management of authenticated users who do not have the user role
  if (
    isLogged &&
    userRole !== 'USER' &&
    (userRoutes.includes(state.url) || state.url === '/')
  ) {
    return router.createUrlTree(['/merchant']);
  }

  return true;
};
