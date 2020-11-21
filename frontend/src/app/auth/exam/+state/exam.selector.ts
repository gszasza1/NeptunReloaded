import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EXAM_FEATURE_KEY, ExamsState } from './exam.reducer';

const getExamState = createFeatureSelector<ExamsState>(EXAM_FEATURE_KEY);

const getExam = createSelector(getExamState, (state: ExamsState) =>
  state.filterForm.length > 0 ? state.list.filter((x) => x.name.includes(state.filterForm)) : state.list
);

const getExamRequesting = createSelector(getExamState, (state: ExamsState) => state.isRequesting);

const getCreateForm = createSelector(getExamState, (state: ExamsState) => state.createForm);
const getEditForm = createSelector(getExamState, (state: ExamsState) => state.editForm);

const getFilterForm = createSelector(getExamState, (state: ExamsState) => state.filterForm);

export const ExamQuery = {
  getExamList: getExam,
  getExamRequesting,
  getCreateForm,
  getFilterForm,
  getEditForm,
};
