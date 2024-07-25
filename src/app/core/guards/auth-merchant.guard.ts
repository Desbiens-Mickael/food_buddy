import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

export const authMerchantGuard: CanActivateFn = ():
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

  // Unauthenticated user management
  if (!isLogged) {
    console.log('merchantGuard', 'unauthenticated');
    return router.createUrlTree(['/login']);
  }

  // Management of authenticated users who do not have the merchant role
  if (userRole !== 'MERCHANT') {
    console.log('merchantGuard', userRole);
    return router.createUrlTree(['/map']);
  }
  return true;
};
