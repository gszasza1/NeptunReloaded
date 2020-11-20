import { Action } from '@ngrx/store';
import { LoginUser } from 'src/app/shared/backend.interface';

export enum LoginFormActionTypes {
  ChangeLoginForm = '[LoginForm] Change LoginForm',
  LoginFormRequest = '[LoginForm] LoginForm Request',
  LoginFormResponse = '[LoginForm] LoginForm Response',
  LoginFormError = '[LoginForm] LoginForm Error',
}

export class ChangeLoginForm implements Action {
  readonly type = LoginFormActionTypes.ChangeLoginForm;
  constructor(public payload: LoginUser) {}
}
export class LoginFormRequest implements Action {
  readonly type = LoginFormActionTypes.LoginFormRequest;
}
export class LoginFormResponse implements Action {
  readonly type = LoginFormActionTypes.LoginFormResponse;
  constructor(public payload: any) {}
}
export class LoginFormError implements Action {
  readonly type = LoginFormActionTypes.LoginFormError;
}

export type LoginFormAction = ChangeLoginForm | LoginFormRequest | LoginFormResponse | LoginFormError;

export const fromLoginFormActions = {
  ChangeLoginForm,
  LoginFormRequest,
  LoginFormResponse,
  LoginFormError,
};
