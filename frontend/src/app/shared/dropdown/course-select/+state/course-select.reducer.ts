import { CourseSelect } from 'src/app/shared/backend.interface';

import { CourseSelectAction, CourseSelectActionTypes } from './course-select.actions';

export const COURSESELECT_FEATURE_KEY = 'CourseSelect';

export interface CourseSelectState {
  list: CourseSelect[];
  isRequesting: boolean;
}

export interface CourseSelectPartialState {
  readonly [COURSESELECT_FEATURE_KEY]: CourseSelectState;
}

export const CourseSelectInitialState: CourseSelectState = {
  list: [],
  isRequesting: false,
};

export function CourseSelectReducer(
  state: CourseSelectState = CourseSelectInitialState,
  action: CourseSelectAction
): CourseSelectState {
  switch (action.type) {
    case CourseSelectActionTypes.CourseSelectRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case CourseSelectActionTypes.CourseSelectResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }
    case CourseSelectActionTypes.CourseSelectError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
  }
  return state;
}
