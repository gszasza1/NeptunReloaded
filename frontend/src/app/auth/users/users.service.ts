import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangeUserRole, MinimalUser } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  getUsers() {
    return this.httpClient.get<MinimalUser[]>('User');
  }

  changeUserRole(changeUser: ChangeUserRole) {
    return this.httpClient.post('User/role', changeUser);
  }
}
