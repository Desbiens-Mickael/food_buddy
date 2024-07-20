import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { CredentialInterceptor } from './core/interceptors/credential.interceptor';

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
  ],
};
