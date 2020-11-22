import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RegisterUser } from '../shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  register(form: RegisterUser) {
    return this.httpClient.post('User/register', form);
  }
}
