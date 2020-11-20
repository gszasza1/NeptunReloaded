import { Action } from '@ngrx/store';
import { UserProfil } from 'src/app/shared/backend.interface';

export enum ProfilActionTypes {
  ChangeUserName = '[Profil] ChangeUserName',
  UserNameChangeRequest = '[Profil] UserNameChange Request',
  UserNameChangeResponse = '[Profil] UserNameChange Response',
  UserNameChangeError = '[Profil] UserNameChange Error',
  ChangePassword = '[Profil] ChangePassword',
  PasswordChangeRequest = '[Profil] PasswordChange Request',
  PasswordChangeResponse = '[Profil] PasswordChange Response',
  PasswordChangeError = '[Profil] PasswordChange Error',

  UserProfilRequest = '[Profil] UserProfilRequest',
  UserProfilResponse = '[Profil] UserProfilResponse',
  UserProfilError = '[Profil] UserProfilError',
}

export class UserProfilResponse implements Action {
  readonly type = ProfilActionTypes.UserProfilResponse;
  constructor(public payload: UserProfil) {}
}
export class UserProfilRequest implements Action {
  readonly type = ProfilActionTypes.UserProfilRequest;
}
export class UserProfilError implements Action {
  readonly type = ProfilActionTypes.UserProfilError;
}

export class ChangeUserName implements Action {
  readonly type = ProfilActionTypes.ChangeUserName;
  constructor(public payload: string) {}
}
export class UserNameChangeRequest implements Action {
  readonly type = ProfilActionTypes.UserNameChangeRequest;
}
export class UserNameChangeResponse implements Action {
  readonly type = ProfilActionTypes.UserNameChangeResponse;
}
export class UserNameChangeError implements Action {
  readonly type = ProfilActionTypes.UserNameChangeError;
}
export class ChangePassword implements Action {
  readonly type = ProfilActionTypes.ChangePassword;
  constructor(public payload: string) {}
}
export class PasswordChangeRequest implements Action {
  readonly type = ProfilActionTypes.PasswordChangeRequest;
}
export class PasswordChangeResponse implements Action {
  readonly type = ProfilActionTypes.PasswordChangeResponse;
}
export class PasswordChangeError implements Action {
  readonly type = ProfilActionTypes.PasswordChangeError;
}

export type ProfilAction =
  | ChangeUserName
  | UserNameChangeRequest
  | UserNameChangeResponse
  | UserNameChangeError
  | ChangePassword
  | PasswordChangeRequest
  | PasswordChangeResponse
  | PasswordChangeError
  | UserProfilRequest
  | UserProfilResponse
  | UserProfilError;

export const fromProfilActions = {
  ChangeUserName,
  UserNameChangeRequest,
  UserNameChangeResponse,
  UserNameChangeError,
  ChangePassword,
  PasswordChangeRequest,
  PasswordChangeResponse,
  PasswordChangeError,
  UserProfilRequest,
  UserProfilResponse,
  UserProfilError,
};
