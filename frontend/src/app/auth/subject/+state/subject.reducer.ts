import { Subject } from 'src/app/shared/backend.interface';

import { SubjectAction, SubjectActionTypes } from './subject.actions';

export const SUBJECT_FEATURE_KEY = 'Subject';

export interface SubjectState {
  list: Subject[];
  createForm: string;
  isRequesting: boolean;
  isPostRequesting: boolean;
  filterForm: string;
  editForm: string;
}

export interface SubjectPartialState {
  readonly [SUBJECT_FEATURE_KEY]: SubjectState;
}

export const SubjectInitialState: SubjectState = {
  list: [],
  isRequesting: false,
  createForm: '',
  isPostRequesting: false,
  filterForm: '',
  editForm: '',
};

export function SubjectReducer(state: SubjectState = SubjectInitialState, action: SubjectAction): SubjectState {
  switch (action.type) {
    case SubjectActionTypes.GetSubjectRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case SubjectActionTypes.GetSubjectResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case SubjectActionTypes.GetSubjectError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
    case SubjectActionTypes.CreateSubjectRequest: {
      state = {
        ...state,
        isPostRequesting: true,
      };
      break;
    }
    case SubjectActionTypes.CreateSubjectResponse:
    case SubjectActionTypes.CreateSubjectError: {
      state = {
        ...state,
        isPostRequesting: false,
      };
      break;
    }
    case SubjectActionTypes.ChangeCreateSubject: {
      state = {
        ...state,
        createForm: action.payload,
      };
      break;
    }
    case SubjectActionTypes.ChangeFilterSubject: {
      state = {
        ...state,
        filterForm: action.payload,
      };
      break;
    }
  }
  return state;
}
