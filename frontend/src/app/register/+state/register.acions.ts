import { Action } from '@ngrx/store';
import { RegisterUser } from 'src/app/shared/backend.interface';

export enum RegisterFormActionTypes {
  ChangeRegisterForm = '[RegisterForm] Change RegisterForm',
  RegisterFormRequest = '[RegisterForm] RegisterForm Request',
  RegisterFormResponse = '[RegisterForm] RegisterForm Response',
  RegisterFormError = '[RegisterForm] RegisterForm Error',
}

export class ChangeRegisterForm implements Action {
  readonly type = RegisterFormActionTypes.ChangeRegisterForm;
  constructor(public payload: RegisterUser) {}
}
export class RegisterFormRequest implements Action {
  readonly type = RegisterFormActionTypes.RegisterFormRequest;
}
export class RegisterFormResponse implements Action {
  readonly type = RegisterFormActionTypes.RegisterFormResponse;
}
export class RegisterFormError implements Action {
  readonly type = RegisterFormActionTypes.RegisterFormError;
}

export type RegisterFormAction = ChangeRegisterForm | RegisterFormRequest | RegisterFormResponse | RegisterFormError;

export const fromRegisterFormActions = {
  ChangeRegisterForm,
  RegisterFormRequest,
  RegisterFormResponse,
  RegisterFormError,
};
