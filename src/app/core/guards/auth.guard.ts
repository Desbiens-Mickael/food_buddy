import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
// import { UserInfo } from '../../shared/models/User-info.model';
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
  authService.userInfo$.subscribe(
    userInfo => (isLogged = userInfo.isAuthenticated),
  );

  const publicRoutes = ['/login', '/register'];
  const userRoutes = ['/profile', '/map', '/logout', '/favorite'];

  // access user not authenticated
  if (!isLogged && !publicRoutes.includes(state.url) && state.url !== '/') {
    return router.createUrlTree(['/login']);
  }

  // access user authenticated
  if (
    isLogged &&
    publicRoutes.includes(state.url) &&
    !userRoutes.includes(state.url)
  ) {
    return router.createUrlTree(['/']);
  }

  return true;
};
