import { Action } from '@ngrx/store';
import { ChangeUserRole, MinimalUser } from 'src/app/shared/backend.interface';

export enum UserActionTypes {
  GetUserRequest = '[User] GetUser Request',
  GetUserResponse = '[User] GetUser Response',
  GetUserError = '[User] GetUser Error',
  ChangeRoleRequest = '[User] ChangeRole Request',
  ChangeRoleResponse = '[User] ChangeRole Response',
  ChangeRoleError = '[User] ChangeRole Error',
  ChangeFilterUser = '[User] ChangeFilterUser',
}
export class ChangeRoleRequest implements Action {
  readonly type = UserActionTypes.ChangeRoleRequest;
  constructor(public payload: ChangeUserRole) {}
}
export class ChangeRoleResponse implements Action {
  readonly type = UserActionTypes.ChangeRoleResponse;
}
export class ChangeRoleError implements Action {
  readonly type = UserActionTypes.ChangeRoleError;
}
export class ChangeFilterUser implements Action {
  readonly type = UserActionTypes.ChangeFilterUser;
  constructor(public payload: string) {}
}
export class GetUserRequest implements Action {
  readonly type = UserActionTypes.GetUserRequest;
}
export class GetUserResponse implements Action {
  readonly type = UserActionTypes.GetUserResponse;
  constructor(public payload: MinimalUser[]) {}
}
export class GetUserError implements Action {
  readonly type = UserActionTypes.GetUserError;
}

export type UserAction =
  | GetUserRequest
  | GetUserResponse
  | GetUserError
  | ChangeRoleRequest
  | ChangeRoleResponse
  | ChangeRoleError
  | ChangeFilterUser;

export const fromUserActions = {
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  ChangeRoleRequest,
  ChangeRoleResponse,
  ChangeRoleError,
  ChangeFilterUser,
};
