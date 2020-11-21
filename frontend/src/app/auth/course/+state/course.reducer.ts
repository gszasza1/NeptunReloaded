import { CourseList } from 'src/app/shared/backend.interface';

import { CourseAction, CourseActionTypes } from './course.actions';

export const COURSE_FEATURE_KEY = 'Course';

export interface CourseState {
  list: CourseList[];
  createForm: string;
  isRequesting: boolean;
  isPostRequesting: boolean;
  filterForm: string;
  editForm: string;
}

export interface CoursePartialState {
  readonly [COURSE_FEATURE_KEY]: CourseState;
}

export const CourseInitialState: CourseState = {
  list: [],
  isRequesting: false,
  createForm: '',
  isPostRequesting: false,
  filterForm: '',
  editForm: '',
};

export function CourseReducer(state: CourseState = CourseInitialState, action: CourseAction): CourseState {
  switch (action.type) {
    case CourseActionTypes.GetCourseRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case CourseActionTypes.GetCourseResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case CourseActionTypes.GetCourseError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
    case CourseActionTypes.CreateCourseRequest: {
      state = {
        ...state,
        isPostRequesting: true,
      };
      break;
    }
    case CourseActionTypes.CreateCourseResponse:
    case CourseActionTypes.CreateCourseError: {
      state = {
        ...state,
        isPostRequesting: false,
      };
      break;
    }
    case CourseActionTypes.ChangeCreateCourse: {
      state = {
        ...state,
        createForm: action.payload,
      };
      break;
    }
    case CourseActionTypes.EditCourseResponse:
    case CourseActionTypes.EditCourseError: {
      state = {
        ...state,
        isPostRequesting: false,
        editForm: '',
      };
      break;
    }
    case CourseActionTypes.ChangeEditCourse: {
      state = {
        ...state,
        editForm: action.payload,
      };
      break;
    }
    case CourseActionTypes.ChangeFilterCourse: {
      state = {
        ...state,
        filterForm: action.payload,
      };
      break;
    }
  }
  return state;
}
