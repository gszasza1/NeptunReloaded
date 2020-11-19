import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { RegisterUser } from '../shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  register(form: RegisterUser) {
    //   return this.httpClient.post('/user/register', form);
    return new BehaviorSubject({}).asObservable().pipe(delay(200));
  }
}
