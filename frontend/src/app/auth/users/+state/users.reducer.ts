import { MinimalUser } from 'src/app/shared/backend.interface';

import { UserAction, UserActionTypes } from './users.actions';

export const USER_FEATURE_KEY = 'User';

export interface UserState {
  list: MinimalUser[];
  isRequesting: boolean;
  isPostRequesting: boolean;
  filterForm: string;
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const UserInitialState: UserState = {
  list: [],
  isRequesting: false,
  isPostRequesting: false,
  filterForm: '',
};

export function UserReducer(state: UserState = UserInitialState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionTypes.GetUserRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case UserActionTypes.GetUserResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case UserActionTypes.GetUserError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
    case UserActionTypes.ChangeRoleRequest: {
      state = {
        ...state,
        isPostRequesting: true,
      };
      break;
    }
    case UserActionTypes.ChangeRoleResponse:
    case UserActionTypes.ChangeRoleError: {
      state = {
        ...state,
        isPostRequesting: false,
      };
      break;
    }
    case UserActionTypes.ChangeFilterUser: {
      state = {
        ...state,
        filterForm: action.payload,
      };
      break;
    }
  }
  return state;
}
