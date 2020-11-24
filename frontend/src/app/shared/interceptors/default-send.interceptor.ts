import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DefaultSendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    let newRequest = request.clone();
    if (token) {
      newRequest = newRequest.clone({
        headers: newRequest.headers.append('Authorization', `Bearer ${token}`),
      });
    }
    newRequest = newRequest.clone({
      headers: newRequest.headers.append('Access-Control-Allow-Origin', '*'),
      url: 'https:localhost:44331/' + newRequest.url,
    });
    return next.handle(newRequest);
  }
}
