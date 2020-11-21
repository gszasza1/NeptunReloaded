import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EXAMSELECT_FEATURE_KEY, ExamSelectState } from './exam-select.reducer';

const getExamSelectState = createFeatureSelector<ExamSelectState>(EXAMSELECT_FEATURE_KEY);
const getExamSelectList = createSelector(getExamSelectState, (state: ExamSelectState) => state.list);
const getExamSelectRequesting = createSelector(getExamSelectState, (state: ExamSelectState) => state.isRequesting);

export const ExamSelectQuery = {
  getExamSelectList,
  getExamSelectRequesting,
};
