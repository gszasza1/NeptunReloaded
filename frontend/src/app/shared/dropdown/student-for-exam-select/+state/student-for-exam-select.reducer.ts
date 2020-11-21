import { StudentForExamSelect } from 'src/app/shared/backend.interface';

import { StudentForExamSelectAction, StudentForExamSelectActionTypes } from './student-for-exam-select.actions';

export const STUDENT_FOR_EXAM_SELECT_FEATURE_KEY = 'StudentForExamSelect';

export interface StudentForExamSelectState {
  list: StudentForExamSelect[];
  isRequesting: boolean;
}

export interface StudentForExamSelectPartialState {
  readonly [STUDENT_FOR_EXAM_SELECT_FEATURE_KEY]: StudentForExamSelectState;
}

export const StudentForExamSelectInitialState: StudentForExamSelectState = {
  list: [],
  isRequesting: false,
};

export function StudentForExamSelectReducer(
  state: StudentForExamSelectState = StudentForExamSelectInitialState,
  action: StudentForExamSelectAction
): StudentForExamSelectState {
  switch (action.type) {
    case StudentForExamSelectActionTypes.StudentForExamSelectRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case StudentForExamSelectActionTypes.StudentForExamSelectResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }
    case StudentForExamSelectActionTypes.StudentForExamSelectError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
  }
  return state;
}
