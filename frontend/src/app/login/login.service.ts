import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginUser } from '../shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}
  login(form: LoginUser) {
    return this.httpClient.post('User/login?skipResponseSnackbar=true', form, {
      responseType: 'text',
    });
  }
}
