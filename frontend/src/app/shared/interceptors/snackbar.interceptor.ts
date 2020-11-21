import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {
  constructor(private snackbar: MatSnackBar) {}
  // tslint:disable-next-line: no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.snackbar.open('Hiba történt', '', { duration: 2000 });
        }
        if (error.status >= 400) {
          this.snackbar.open(JSON.stringify(error.error), '', { duration: 2000 });
        }
        return throwError(error);
      })
    );
  }
}
