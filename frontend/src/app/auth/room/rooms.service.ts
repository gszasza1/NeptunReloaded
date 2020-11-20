import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Room } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  getRooms() {
    // tslint:disable-next-line: variable-name
    return new BehaviorSubject<Room[]>([...Array(20)].map((_, i) => ({ id: i, name: 'Szoba ' + i })))
      .asObservable()
      .pipe(delay(300));
  }

  createRoom(name: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
  editRoom(id: number, name: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
}
