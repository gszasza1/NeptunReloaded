import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginUser } from '../shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}
  login(form: LoginUser) {
    return this.httpClient.post('https:localhost:44331/User/login', form, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Content-Type': 'application/json',
      },
    });
    // return new BehaviorSubject({}).asObservable().pipe(delay(200));
  }
}
