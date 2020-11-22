import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePassword, ChangeUsername, UserProfil } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  constructor(private httpClient: HttpClient) {}
  getUser() {
    return this.httpClient.get<UserProfil>('User');
  }

  changePass(password: ChangePassword) {
    return this.httpClient.post('User/password', password);
  }

  changeUserName(userName: ChangeUsername) {
    return this.httpClient.post('User/username', userName);
  }
}
