import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SUBJECT_SELECT_FEATURE_KEY, SubjectSelectState } from './subject-select.reducer';

const getSubjectSelectState = createFeatureSelector<SubjectSelectState>(SUBJECT_SELECT_FEATURE_KEY);
const getSubjectSelectList = createSelector(getSubjectSelectState, (state: SubjectSelectState) => state.list);
const getSubjectSelectRequesting = createSelector(
  getSubjectSelectState,
  (state: SubjectSelectState) => state.isRequesting
);

export const SubjectSelectQuery = {
  getSubjectSelectList,
  getSubjectSelectRequesting,
};
