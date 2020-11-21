import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RegisterUser } from '../shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  register(form: RegisterUser) {
    return this.httpClient.post('https:localhost:44331/User/register', form, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Content-Type': 'application/json',
      },
    });
    // return new BehaviorSubject({}).asObservable().pipe(delay(200));
  }
}
