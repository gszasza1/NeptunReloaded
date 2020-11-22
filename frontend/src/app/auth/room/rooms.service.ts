import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRoom, EditRoom, Room } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private httpClient: HttpClient) {}
  getRooms() {
    return this.httpClient.get<Room[]>('Room');
  }

  createRoom(room: CreateRoom) {
    return this.httpClient.post('Room', room);
  }
  editRoom(room: EditRoom) {
    return this.httpClient.put('Room', room);
  }
}
