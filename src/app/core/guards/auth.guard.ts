import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfo } from '../../shared/models/User-info.model';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router: Router = inject(Router);
  const userInfo = JSON.parse(
    localStorage.getItem('userInfo') ?? '{}',
  ) as UserInfo;

  const routePublic = ['/', '/login', '/register'];

  // access user not authenticated
  if (!userInfo.isAuthenticated && !routePublic.includes(state.url)) {
    return router.createUrlTree(['/login']);
  }

  if (userInfo.isAuthenticated && state.url === routePublic[1]) {
    return router.createUrlTree(['/']);
  }

  return true;
};
