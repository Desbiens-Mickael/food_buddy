import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

export const authGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router: Router = inject(Router);

  if (
    !authService.geIsAuthenticated() &&
    state.url !== '/login' &&
    state.url !== '/'
  ) {
    await router.navigateByUrl('/login');
    return false;
  }

  if (authService.geIsAuthenticated() && state.url === '/login') {
    await router.navigateByUrl('/');
    return false;
  }
  return true;
};
