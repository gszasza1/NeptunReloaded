import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserProfil } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  getUser() {
    return new BehaviorSubject<UserProfil>({
      id: 1,
      createdAt: new Date(),
      firstName: 'Kis',
      lastName: 'Lajos',
      neptun: 'BATEKA',
      username: 'kisLajos',
    })
      .asObservable()
      .pipe(delay(200));
  }

  changePass(password: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(200));
  }

  changeUserName(userName: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(200));
  }
}
