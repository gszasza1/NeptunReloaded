import { Room } from 'src/app/shared/backend.interface';

import { RoomAction, RoomActionTypes } from './rooms.actions';

export const ROOM_FEATURE_KEY = 'Room';

export interface RoomState {
  list: Room[];
  createForm: string;
  isRequesting: boolean;
  isPostRequesting: boolean;
  filterForm: string;
  editForm: string;
}

export interface RoomPartialState {
  readonly [ROOM_FEATURE_KEY]: RoomState;
}

export const RoomInitialState: RoomState = {
  list: [],
  isRequesting: false,
  createForm: '',
  isPostRequesting: false,
  filterForm: '',
  editForm: '',
};

export function RoomReducer(state: RoomState = RoomInitialState, action: RoomAction): RoomState {
  switch (action.type) {
    case RoomActionTypes.GetRoomRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case RoomActionTypes.GetRoomResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case RoomActionTypes.GetRoomError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
    case RoomActionTypes.CreateRoomRequest: {
      state = {
        ...state,
        isPostRequesting: true,
      };
      break;
    }
    case RoomActionTypes.CreateRoomResponse:
    case RoomActionTypes.CreateRoomError: {
      state = {
        ...state,
        isPostRequesting: false,
        createForm: '',
      };
      break;
    }
    case RoomActionTypes.EditRoomResponse:
    case RoomActionTypes.EditRoomError: {
      state = {
        ...state,
        isPostRequesting: false,
        editForm: '',
      };
      break;
    }
    case RoomActionTypes.ChangeCreateRoom: {
      state = {
        ...state,
        createForm: action.payload,
      };
      break;
    }
    case RoomActionTypes.ChangeEditRoom: {
      state = {
        ...state,
        editForm: action.payload,
      };
      break;
    }
    case RoomActionTypes.ChangeFilterRoom: {
      state = {
        ...state,
        filterForm: action.payload,
      };
      break;
    }
  }
  return state;
}
