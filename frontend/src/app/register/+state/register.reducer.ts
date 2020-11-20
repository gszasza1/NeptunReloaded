import { RegisterUser } from 'src/app/shared/backend.interface';

import { RegisterFormAction, RegisterFormActionTypes } from './register.acions';

export const REGISTERFORM_FEATURE_KEY = 'RegisterForm';

export interface RegisterFormState {
  form: RegisterUser;
  isRequeting: boolean;
}

export interface RegisterFormPartialState {
  readonly [REGISTERFORM_FEATURE_KEY]: RegisterFormState;
}

export const registerFormInitialState: RegisterFormState = {
  form: { password: '', username: '', firstName: '', lastName: '', neptun: '' },
  isRequeting: false,
};

export function RegisterFormReducer(
  state: RegisterFormState = registerFormInitialState,
  action: RegisterFormAction
): RegisterFormState {
  switch (action.type) {
    case RegisterFormActionTypes.ChangeRegisterForm: {
      state = {
        ...state,
        form: action.payload,
      };
      break;
    }
    case RegisterFormActionTypes.RegisterFormRequest: {
      state = {
        ...state,
        isRequeting: true,
      };
      break;
    }
    case RegisterFormActionTypes.RegisterFormError:
    case RegisterFormActionTypes.RegisterFormResponse: {
      state = {
        ...state,
        isRequeting: false,
      };
      break;
    }
  }
  return state;
}
