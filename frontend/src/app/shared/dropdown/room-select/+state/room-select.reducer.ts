import { RoomSelect } from 'src/app/shared/backend.interface';

import { RoomSelectAction, RoomSelectActionTypes } from './room-select.actions';

export const ROOMSELECT_FEATURE_KEY = 'RoomSelect';

export interface RoomSelectState {
  list: RoomSelect[];
  isRequesting: boolean;
}

export interface RoomSelectPartialState {
  readonly [ROOMSELECT_FEATURE_KEY]: RoomSelectState;
}

export const RoomSelectInitialState: RoomSelectState = {
  list: [],
  isRequesting: false,
};

export function RoomSelectReducer(
  state: RoomSelectState = RoomSelectInitialState,
  action: RoomSelectAction
): RoomSelectState {
  switch (action.type) {
    case RoomSelectActionTypes.RoomSelectRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case RoomSelectActionTypes.RoomSelectResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }
    case RoomSelectActionTypes.RoomSelectError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
  }
  return state;
}
