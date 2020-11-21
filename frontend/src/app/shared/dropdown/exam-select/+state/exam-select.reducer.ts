import { ExamSelect } from 'src/app/shared/backend.interface';

import { ExamSelectAction, ExamSelectActionTypes } from './exam-select.actions';

export const EXAMSELECT_FEATURE_KEY = 'ExamSelect';

export interface ExamSelectState {
  list: ExamSelect[];
  isRequesting: boolean;
}

export interface ExamSelectPartialState {
  readonly [EXAMSELECT_FEATURE_KEY]: ExamSelectState;
}

export const ExamSelectInitialState: ExamSelectState = {
  list: [],
  isRequesting: false,
};

export function ExamSelectReducer(
  state: ExamSelectState = ExamSelectInitialState,
  action: ExamSelectAction
): ExamSelectState {
  switch (action.type) {
    case ExamSelectActionTypes.ExamSelectRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case ExamSelectActionTypes.ExamSelectResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }
    case ExamSelectActionTypes.ExamSelectError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
  }
  return state;
}
