import { CourseResultsExtended, CreateCourseResult } from 'src/app/shared/backend.interface';

import { CourseResultAction, CourseResultActionTypes } from './course-result.actions';

export const CourseResult_FEATURE_KEY = 'CourseResult';

export interface CourseResultState {
  list: CourseResultsExtended[];
  createForm: CreateCourseResult;
  isRequesting: boolean;
  isPostRequesting: boolean;
  filterForm: string;
}

export interface CourseResultPartialState {
  readonly [CourseResult_FEATURE_KEY]: CourseResultState;
}

export const CourseResultInitialState: CourseResultState = {
  list: [],
  isRequesting: false,
  createForm: {
    examId: null,
    score: 0,
    userId: null,
  },
  isPostRequesting: false,
  filterForm: '',
};

export function CourseResultReducer(
  state: CourseResultState = CourseResultInitialState,
  action: CourseResultAction
): CourseResultState {
  switch (action.type) {
    case CourseResultActionTypes.GetCourseResultRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case CourseResultActionTypes.ChangeCourseResultFilter: {
      state = {
        ...state,
        filterForm: action.payload,
      };
      break;
    }
    case CourseResultActionTypes.GetCourseResultResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case CourseResultActionTypes.GetCourseResultError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
    case CourseResultActionTypes.CreateCourseResultRequest: {
      state = {
        ...state,
        isPostRequesting: true,
      };
      break;
    }
    case CourseResultActionTypes.CreateCourseResultResponse:
    case CourseResultActionTypes.CreateCourseResultError: {
      state = {
        ...state,
        isPostRequesting: false,
        createForm: CourseResultInitialState.createForm,
      };
      break;
    }
    case CourseResultActionTypes.ChangeCreateCourseResult: {
      state = {
        ...state,
        createForm: action.payload,
      };
      break;
    }
  }
  return state;
}
