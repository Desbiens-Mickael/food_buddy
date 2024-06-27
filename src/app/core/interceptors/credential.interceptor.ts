// demo.interceptor.ts

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CredentialInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<object>,
    next: HttpHandler,
  ): Observable<HttpEvent<object>> {
    const modifiedRequest = request.clone({
      withCredentials: true,
    });

    return next.handle(modifiedRequest);
  }
}
