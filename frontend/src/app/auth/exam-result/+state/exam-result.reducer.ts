import { LoginUser } from 'src/app/shared/backend.interface';

import { ExamResultAction, ExamResultActionTypes } from './exam-result.actions';

export const EXAMRESULT_FEATURE_KEY = 'ExamResult';

export interface ExamResultState {
  form: LoginUser;
  isRequeting: boolean;
}

export interface ExamResultPartialState {
  readonly [EXAMRESULT_FEATURE_KEY]: ExamResultState;
}

export const ExamResultInitialState: ExamResultState = {
  form: { password: '', username: '' },
  isRequeting: false,
};

export function ExamResultReducer(
  state: ExamResultState = ExamResultInitialState,
  action: ExamResultAction
): ExamResultState {
  switch (action.type) {
    case ExamResultActionTypes.ChangeExamResult: {
      state = {
        ...state,
        form: action.payload,
      };
      break;
    }
    case ExamResultActionTypes.ExamResultRequest: {
      state = {
        ...state,
        isRequeting: true,
      };
      break;
    }
    case ExamResultActionTypes.ExamResultResponse:
    case ExamResultActionTypes.ExamResultError: {
      state = {
        ...state,
        isRequeting: false,
      };
      break;
    }
  }
  return state;
}
