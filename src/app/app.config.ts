import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { CredentialInterceptor } from './core/interceptors/credential.interceptor';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {};

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
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
};
