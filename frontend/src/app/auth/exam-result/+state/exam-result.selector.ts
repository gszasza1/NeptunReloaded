import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EXAMRESULT_FEATURE_KEY, ExamResultState } from './exam-result.reducer';

const getExamResultState = createFeatureSelector<ExamResultState>(EXAMRESULT_FEATURE_KEY);
const getExamResult = createSelector(getExamResultState, (state: ExamResultState) => state.form);
const getExamResultRequesting = createSelector(getExamResultState, (state: ExamResultState) => state.isRequeting);

export const ExamResultQuery = {
  getExamResult,
  getExamResultRequesting,
};
