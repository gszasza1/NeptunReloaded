import { Exams } from 'src/app/shared/backend.interface';

import { MyExamsAction, MyExamsActionTypes } from './my-exams.actions';

export const MY_EXAMS_FEATURE_KEY = 'MyExamss';

export interface MyExamsState {
  list: Exams[];
  isRequesting: boolean;
}

export interface MyExamssPartialState {
  readonly [MY_EXAMS_FEATURE_KEY]: MyExamsState;
}

export const MyExamsInitialState: MyExamsState = {
  list: [],
  isRequesting: false,
};

export function MyExamsReducer(state: MyExamsState = MyExamsInitialState, action: MyExamsAction): MyExamsState {
  switch (action.type) {
    case MyExamsActionTypes.GetMyExamsRequest: {
      state = {
        ...state,
        isRequesting: true,
      };
      break;
    }
    case MyExamsActionTypes.GetMyExamsResponse: {
      state = {
        ...state,
        isRequesting: false,
        list: action.payload,
      };
      break;
    }

    case MyExamsActionTypes.GetMyExamsError: {
      state = {
        ...state,
        isRequesting: false,
      };
      break;
    }
  }
  return state;
}
