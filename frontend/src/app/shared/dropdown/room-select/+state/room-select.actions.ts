import { Action } from '@ngrx/store';
import { RoomSelect } from 'src/app/shared/backend.interface';

export enum RoomSelectActionTypes {
  RoomSelectRequest = '[RoomSelect] RoomSelect Request',
  RoomSelectResponse = '[RoomSelect] RoomSelect Response',
  RoomSelectError = '[RoomSelect] RoomSelect Error',
}

export class RoomSelectRequest implements Action {
  readonly type = RoomSelectActionTypes.RoomSelectRequest;
}
export class RoomSelectResponse implements Action {
  readonly type = RoomSelectActionTypes.RoomSelectResponse;
  constructor(public payload: RoomSelect[]) {}
}
export class RoomSelectError implements Action {
  readonly type = RoomSelectActionTypes.RoomSelectError;
}

export type RoomSelectAction = RoomSelectRequest | RoomSelectResponse | RoomSelectError;

export const fromRoomSelectActions = {
  RoomSelectRequest,
  RoomSelectResponse,
  RoomSelectError,
};
