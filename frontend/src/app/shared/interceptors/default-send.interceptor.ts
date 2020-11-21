import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DefaultSendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    let newRequest;
    if (token) {
      newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    newRequest = request.clone({
      headers: request.headers.set('Access-Control-Allow-Origin', '*'),
      url: 'https:localhost:44331/' + request.url,
    });
    return next.handle(newRequest);
  }
}
