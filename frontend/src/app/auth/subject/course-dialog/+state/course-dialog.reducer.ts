import { CoursesPopUp } from 'src/app/shared/backend.interface';

import { SubjectCourseAction, SubjectCourseActionTypes } from './course-dialog.actions';

export const SUBJECTCOURSE_FEATURE_KEY = 'SubjectCourse';

export interface SubjectCourseState {
  list: CoursesPopUp[];
  createForm: string;
  isRequesting: boolean;
  isPostRequesting: boolean;
  filterForm: string;
  editForm: string;
  currentSubject: number;
}

export interface SubjectCoursePartialState {
  readonly [SUBJECTCOURSE_FEATURE_KEY]: SubjectCourseState;
}

export const SubjectCourseInitialState: SubjectCourseState = {
  list: [],
  isRequesting: false,
  createForm: '',
  isPostRequesting: false,
  filterForm: '',
  editForm: '',
  currentSubject: null,
};

export function SubjectCourseReducer(
  state: SubjectCourseState = SubjectCourseInitialState,
  action: SubjectCourseAction
): SubjectCourseState {
  switch (action.type) {
    case SubjectCourseActionTypes.GetSubjectCourseRequest: {
      state = {
        ...state,
        isRequesting: true,
        currentSubject: action.payload,
      };
      break;
    }
    case SubjectCourseActionTypes.GetSubjectCourseResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case SubjectCourseActionTypes.GetSubjectCourseError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
    case SubjectCourseActionTypes.ChangeFilterSubjectCourse: {
      state = {
        ...state,
        filterForm: action.payload,
      };
      break;
    }
  }
  return state;
}
