import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EXAMRESULT_FEATURE_KEY, ExamResultState } from './exam-result.reducer';

const getExamResultState = createFeatureSelector<ExamResultState>(EXAMRESULT_FEATURE_KEY);

const getExamResultList = createSelector(getExamResultState, (state: ExamResultState) =>
  state.filterForm.length > 0 ? state.list.filter((x) => x.neptun.includes(state.filterForm)) : state.list
);

const getExamResultRequesting = createSelector(getExamResultState, (state: ExamResultState) => state.isRequesting);

const getCreateForm = createSelector(getExamResultState, (state: ExamResultState) => state.createForm);
const getFilterForm = createSelector(getExamResultState, (state: ExamResultState) => state.filterForm);

export const ExamResultQuery = {
  getExamResultList,
  getExamResultRequesting,
  getCreateForm,
  getFilterForm,
};
