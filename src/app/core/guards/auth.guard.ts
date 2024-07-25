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
  let userRole!: string | undefined;

  authService.userInfo$.subscribe(userInfo => {
    isLogged = !!userInfo?.email;
    userRole = userInfo?.role;
  });

  console.log(userRole, isLogged, state.url);
  const URL = state.url.split('/')[1];

  const publicRoutes = ['login', 'register'];
  const userRoutes = ['profile', 'map', 'reservations', 'establishments'];

  // Unauthenticated user management
  if (!isLogged && userRoutes.includes(URL)) {
    return router.createUrlTree(['/login']);
  }

  // Authenticated user management for the public route
  if (isLogged && publicRoutes.includes(URL)) {
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
