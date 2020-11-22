import jwt_decode from 'jwt-decode';
import { LoginUser } from 'src/app/shared/backend.interface';

import { LoginFormAction, LoginFormActionTypes } from './login.acions';

export const LOGINFORM_FEATURE_KEY = 'LoginForm';

export interface LoginFormState {
  form: LoginUser;
  isRequesting: boolean;
  token: string;
  decodedToken: any;
}

export interface LoginFormPartialState {
  readonly [LOGINFORM_FEATURE_KEY]: LoginFormState;
}

export const loginFormInitialState: LoginFormState = {
  form: { password: '', username: '' },
  isRequesting: false,
  decodedToken: {},
  token: null,
};

export function LoginFormReducer(
  state: LoginFormState = loginFormInitialState,
  action: LoginFormAction
): LoginFormState {
  switch (action.type) {
    case LoginFormActionTypes.ChangeLoginForm: {
      state = {
        ...state,
        form: action.payload,
      };
      break;
    }
    case LoginFormActionTypes.LoginFormRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case LoginFormActionTypes.LoginFormResponse: {
      localStorage.setItem('token', action.payload + '');
      state = {
        ...state,
        form: loginFormInitialState.form,
        isRequesting: false,
        token: action.payload,
        decodedToken: jwt_decode(action.payload),
      };
      break;
    }
    case LoginFormActionTypes.LoginFormError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
  }
  return state;
}
