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
  let isEligible!: boolean;
  let userRole!: string | undefined;

  authService.userInfo$.subscribe(userInfo => {
    isLogged = !!userInfo?.email;
    isEligible = userInfo?.isEligible ?? false;
    userRole = userInfo?.role;
  });

  const URL = state.url.split('/')[1];

  const publicRoutes = ['login', 'register'];
  const userRoutes = ['profile', 'map', 'establishments'];
  const eligibleRoutes = ['reservations'];

  // Unauthenticated user management
  if (!isLogged && userRoutes.includes(URL)) {
    return router.createUrlTree(['/login']);
  }

  // Authenticated user management for public and eligible routes
  if (
    (isLogged && publicRoutes.includes(URL)) ||
    (!isEligible && eligibleRoutes.includes(URL))
  ) {
    if (userRole === 'MERCHANT') return router.createUrlTree(['/merchant']);

    return router.createUrlTree(['/']);
  }

  // Management of authenticated users who do not have the user role
  if (
    isLogged &&
    userRole !== 'USER' &&
    (userRoutes.includes(URL) || state.url === '/')
  ) {
    return router.createUrlTree(['/merchant']);
  }

  return true;
};
