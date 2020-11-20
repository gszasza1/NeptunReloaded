import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { LoginUser } from '../shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  login(form: LoginUser) {
    //   return this.httpClient.post('/user/register', form);
    return new BehaviorSubject({}).asObservable().pipe(delay(200));
  }
}
