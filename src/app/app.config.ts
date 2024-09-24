import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { routes } from './app.routes';
import { CredentialInterceptor } from './core/interceptors/credential.interceptor';
import { UserInfo } from './shared/models/User-info.model';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

export function initializeApp(
  userService: UserService,
  authService: AuthService,
) {
  return () => {
    // Appel à getUser pour vérifier et récupérer les informations utilisateur
    return lastValueFrom(userService.getUser())
      .then((user: UserInfo | null) => {
        if (user) {
          authService.setUserInfo(user);
        }
      })
      .catch((error: unknown) => {
        console.error('Error during app initialization:', error);
      });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    HttpClient,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([CredentialInterceptor])),
    provideAnimationsAsync(),
    provideToastr({
      progressBar: true,
      positionClass: 'toast-custom-position',
    }),
    AuthService,
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [UserService, AuthService],
      multi: true,
    },
  ],
};
