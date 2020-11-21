import { CreateExamResult, ExamResults } from 'src/app/shared/backend.interface';

import { ExamResultAction, ExamResultActionTypes } from './exam-result.actions';

export const EXAMRESULT_FEATURE_KEY = 'ExamResult';

export interface ExamResultState {
  list: ExamResults[];
  createForm: CreateExamResult;
  isRequesting: boolean;
  isPostRequesting: boolean;
  filterForm: string;
}

export interface ExamResultPartialState {
  readonly [EXAMRESULT_FEATURE_KEY]: ExamResultState;
}

export const ExamResultInitialState: ExamResultState = {
  list: [],
  isRequesting: false,
  createForm: {
    examId: null,
    score: 0,
    studentId: null,
  },
  isPostRequesting: false,
  filterForm: '',
};

export function ExamResultReducer(
  state: ExamResultState = ExamResultInitialState,
  action: ExamResultAction
): ExamResultState {
  switch (action.type) {
    case ExamResultActionTypes.GetExamResultRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case ExamResultActionTypes.ChangeExamResultFilter: {
      state = {
        ...state,
        filterForm: action.payload,
      };
      break;
    }
    case ExamResultActionTypes.GetExamResultResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case ExamResultActionTypes.GetExamResultError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
    case ExamResultActionTypes.CreateExamResultRequest: {
      state = {
        ...state,
        isPostRequesting: true,
      };
      break;
    }
    case ExamResultActionTypes.CreateExamResultResponse:
    case ExamResultActionTypes.CreateExamResultError: {
      state = {
        ...state,
        isPostRequesting: false,
      };
      break;
    }
    case ExamResultActionTypes.ChangeCreateExamResult: {
      state = {
        ...state,
        createForm: action.payload,
      };
      break;
    }
  }
  return state;
}
