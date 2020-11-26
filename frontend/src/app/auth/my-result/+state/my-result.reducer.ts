import { CourseResultsExtended } from 'src/app/shared/backend.interface';

import { MyResultAction, MyResultActionTypes } from './my-result.actions';

export const MY_Result_FEATURE_KEY = 'MyResults';

export interface MyResultState {
  list: CourseResultsExtended[];
  isRequesting: boolean;
}

export interface MyResultsPartialState {
  readonly [MY_Result_FEATURE_KEY]: MyResultState;
}

export const MyResultInitialState: MyResultState = {
  list: [],
  isRequesting: false,
};

export function MyResultReducer(state: MyResultState = MyResultInitialState, action: MyResultAction): MyResultState {
  switch (action.type) {
    case MyResultActionTypes.GetMyResultRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case MyResultActionTypes.GetMyResultResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case MyResultActionTypes.GetMyResultError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
  }
  return state;
}
