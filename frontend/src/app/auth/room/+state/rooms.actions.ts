import { Action } from '@ngrx/store';
import { Room } from 'src/app/shared/backend.interface';

export enum RoomActionTypes {
  GetRoomRequest = '[Room] GetRoom Request',
  GetRoomResponse = '[Room] GetRoom Response',
  GetRoomError = '[Room] GetRoom Error',

  CreateRoomRequest = '[Room] CreateRoom Request',
  CreateRoomResponse = '[Room] CreateRoom Response',
  CreateRoomError = '[Room] CreateRoom Error',
  ChangeCreateRoom = '[Room] ChangeCreateRoom',

  EditRoomRequest = '[Room] EditRoom Request',
  EditRoomResponse = '[Room] EditRoom Response',
  EditRoomError = '[Room] EditRoom Error',
  ChangeEditRoom = '[Room] ChangeEditRoom',

  ChangeFilterRoom = '[Room] ChangeFilterRoom',
}

export class ChangeEditRoom implements Action {
  readonly type = RoomActionTypes.ChangeEditRoom;
  constructor(public payload: string) {}
}
export class EditRoomRequest implements Action {
  readonly type = RoomActionTypes.EditRoomRequest;
  constructor(public payload: number) {}
}
export class EditRoomResponse implements Action {
  readonly type = RoomActionTypes.EditRoomResponse;
}
export class EditRoomError implements Action {
  readonly type = RoomActionTypes.EditRoomError;
}
export class ChangeFilterRoom implements Action {
  readonly type = RoomActionTypes.ChangeFilterRoom;
  constructor(public payload: string) {}
}
export class ChangeCreateRoom implements Action {
  readonly type = RoomActionTypes.ChangeCreateRoom;
  constructor(public payload: string) {}
}
export class CreateRoomRequest implements Action {
  readonly type = RoomActionTypes.CreateRoomRequest;
}
export class CreateRoomResponse implements Action {
  readonly type = RoomActionTypes.CreateRoomResponse;
}
export class CreateRoomError implements Action {
  readonly type = RoomActionTypes.CreateRoomError;
}
export class GetRoomRequest implements Action {
  readonly type = RoomActionTypes.GetRoomRequest;
}
export class GetRoomResponse implements Action {
  readonly type = RoomActionTypes.GetRoomResponse;
  constructor(public payload: Room[]) {}
}
export class GetRoomError implements Action {
  readonly type = RoomActionTypes.GetRoomError;
}

export type RoomAction =
  | GetRoomRequest
  | GetRoomResponse
  | GetRoomError
  | CreateRoomRequest
  | CreateRoomResponse
  | CreateRoomError
  | ChangeCreateRoom
  | ChangeFilterRoom
  | EditRoomRequest
  | EditRoomResponse
  | EditRoomError
  | ChangeEditRoom;

export const fromRoomActions = {
  GetRoomRequest,
  GetRoomResponse,
  GetRoomError,
  CreateRoomRequest,
  CreateRoomResponse,
  CreateRoomError,
  ChangeCreateRoom,
  ChangeFilterRoom,
  EditRoomRequest,
  EditRoomResponse,
  EditRoomError,
  ChangeEditRoom,
};
