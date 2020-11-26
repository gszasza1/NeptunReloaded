import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UnAuthInterceptor implements HttpInterceptor {
  constructor(private store: Store, private router: Router) {}
  // tslint:disable-next-line: no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          sessionStorage.clear();
          this.store.dispatch({ type: 'SET_ROOT_STATE' });
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      })
    );
  }
}
