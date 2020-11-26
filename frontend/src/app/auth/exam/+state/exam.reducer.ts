import { CreateExam, UserListExam } from 'src/app/shared/backend.interface';

import { ExamAction, ExamActionTypes } from './exam.actions';

export const EXAM_FEATURE_KEY = 'Exams';

export interface ExamsState {
  list: UserListExam[];
  createForm: CreateExam;
  isRequesting: boolean;
  isPostRequesting: boolean;
  filterForm: string;
  editForm: string;
}

export interface ExamsPartialState {
  readonly [EXAM_FEATURE_KEY]: ExamsState;
}

export const ExamsInitialState: ExamsState = {
  list: [],
  isRequesting: false,
  createForm: {
    courseId: null,
    name: '',
  },
  isPostRequesting: false,
  filterForm: '',
  editForm: '',
};

export function ExamsReducer(state: ExamsState = ExamsInitialState, action: ExamAction): ExamsState {
  switch (action.type) {
    case ExamActionTypes.GetExamRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case ExamActionTypes.GetExamResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case ExamActionTypes.GetExamError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
    case ExamActionTypes.LeaveExamRequest:
    case ExamActionTypes.JoinExamRequest:
    case ExamActionTypes.EditExamRequest:
    case ExamActionTypes.CreateExamRequest: {
      state = {
        ...state,
        isPostRequesting: true,
      };
      break;
    }
    case ExamActionTypes.CreateExamResponse:
    case ExamActionTypes.CreateExamError: {
      state = {
        ...state,
        isPostRequesting: false,
        createForm: ExamsInitialState.createForm,
      };
      break;
    }
    case ExamActionTypes.LeaveExamResponse:
    case ExamActionTypes.LeaveExamError:
    case ExamActionTypes.JoinExamResponse:
    case ExamActionTypes.JoinExamError: {
      state = {
        ...state,
        isPostRequesting: false,
      };
      break;
    }
    case ExamActionTypes.EditExamResponse:
    case ExamActionTypes.EditExamError: {
      state = {
        ...state,
        isPostRequesting: false,
        editForm: '',
      };
      break;
    }
    case ExamActionTypes.ChangeCreateExam: {
      state = {
        ...state,
        createForm: action.payload,
      };
      break;
    }
    case ExamActionTypes.ChangeEditExam: {
      state = {
        ...state,
        editForm: action.payload,
      };
      break;
    }
    case ExamActionTypes.ChangeFilterExam: {
      state = {
        ...state,
        filterForm: action.payload,
      };
      break;
    }
  }
  return state;
}
