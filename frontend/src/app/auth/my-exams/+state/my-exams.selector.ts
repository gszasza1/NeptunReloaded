import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MY_EXAMS_FEATURE_KEY, MyExamsState } from './my-exams.reducer';

const getMyExamState = createFeatureSelector<MyExamsState>(MY_EXAMS_FEATURE_KEY);

const getMyExamList = createSelector(getMyExamState, (state: MyExamsState) => state.list);

const getMyExamRequesting = createSelector(getMyExamState, (state: MyExamsState) => state.isRequesting);

export const MyExamsQuery = {
  getMyExamList,
  getMyExamRequesting,
};
