import { SubjectSelect } from 'src/app/shared/backend.interface';

import { SubjectSelectAction, SubjectSelectActionTypes } from './Subject-select.actions';

export const SUBJECT_SELECT_FEATURE_KEY = 'SubjectSelect';

export interface SubjectSelectState {
  list: SubjectSelect[];
  isRequesting: boolean;
}

export interface SubjectSelectPartialState {
  readonly [SUBJECT_SELECT_FEATURE_KEY]: SubjectSelectState;
}

export const SubjectSelectInitialState: SubjectSelectState = {
  list: [],
  isRequesting: false,
};

export function SubjectSelectReducer(
  state: SubjectSelectState = SubjectSelectInitialState,
  action: SubjectSelectAction
): SubjectSelectState {
  switch (action.type) {
    case SubjectSelectActionTypes.SubjectSelectRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case SubjectSelectActionTypes.SubjectSelectResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }
    case SubjectSelectActionTypes.SubjectSelectError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
  }
  return state;
}
