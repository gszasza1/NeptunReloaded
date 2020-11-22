import { UserProfil } from 'src/app/shared/backend.interface';

import { ProfilAction, ProfilActionTypes } from './profil.actions';

export const PROFIL_FEATURE_KEY = 'Profil';

export interface ProfilState {
  username: string;
  password: string;
  isRequesting: boolean;
  isChangeRequesting: boolean;
  profil: UserProfil;
}

export interface ProfilPartialState {
  readonly [PROFIL_FEATURE_KEY]: ProfilState;
}

export const ProfilInitialState: ProfilState = {
  password: '',
  username: '',
  isRequesting: false,
  isChangeRequesting: false,
  profil: {
    id: 0,
    createdAt: null,
    firstName: '',
    lastName: '',
    neptun: '',
    username: '',
  },
};

export function ProfilReducer(state: ProfilState = ProfilInitialState, action: ProfilAction): ProfilState {
  switch (action.type) {
    case ProfilActionTypes.ChangeUserName: {
      state = {
        ...state,
        username: action.payload,
      };
      break;
    }
    case ProfilActionTypes.ChangePassword: {
      state = {
        ...state,
        password: action.payload,
      };
      break;
    }
    case ProfilActionTypes.UserNameChangeRequest: {
      state = {
        ...state,
        isChangeRequesting: true,
      };
      break;
    }
    case ProfilActionTypes.UserNameChangeResponse: {
      state = {
        ...state,
        isChangeRequesting: false,
        username: ProfilInitialState.username,
        profil: { ...state.profil, username: state.username },
      };
      break;
    }
    case ProfilActionTypes.UserNameChangeError: {
      state = {
        ...state,
        isChangeRequesting: false,
      };
      break;
    }
    case ProfilActionTypes.PasswordChangeRequest: {
      state = {
        ...state,
        isChangeRequesting: true,
      };
      break;
    }
    case ProfilActionTypes.PasswordChangeResponse: {
      state = {
        ...state,
        password: ProfilInitialState.password,
        isChangeRequesting: false,
      };
      break;
    }
    case ProfilActionTypes.PasswordChangeError: {
      state = {
        ...state,
        isChangeRequesting: false,
      };
      break;
    }
    case ProfilActionTypes.UserProfilRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case ProfilActionTypes.UserProfilResponse: {
      state = {
        ...state,
        isRequesting: false,
        profil: action.payload,
      };
      break;
    }
    case ProfilActionTypes.UserProfilError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
  }
  return state;
}
