// demo.interceptor.ts

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export function CredentialInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const API_URL = environment.apiUrl;
  const modifiedRequest = req.url.startsWith(API_URL)
    ? req.clone({ withCredentials: true })
    : req;
  return next(modifiedRequest);
}
