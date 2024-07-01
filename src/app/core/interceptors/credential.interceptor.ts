// demo.interceptor.ts

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function CredentialInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const modifiedRequest = req.clone(
    req.url.startsWith('https://food-buddy.olprog-b.fr')
      ? { withCredentials: true }
      : {},
  );

  return next(modifiedRequest);
}
