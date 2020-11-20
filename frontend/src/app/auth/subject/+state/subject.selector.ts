import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SUBJECT_FEATURE_KEY, SubjectState } from './subject.reducer';

const getSubjectState = createFeatureSelector<SubjectState>(SUBJECT_FEATURE_KEY);

const getSubject = createSelector(getSubjectState, (state: SubjectState) =>
  state.filterForm.length > 0 ? state.list.filter((x) => x.name.includes(state.filterForm)) : state.list
);

const getSubjectRequesting = createSelector(getSubjectState, (state: SubjectState) => state.isRequesting);

const getCreateForm = createSelector(getSubjectState, (state: SubjectState) => state.createForm);
const getEditForm = createSelector(getSubjectState, (state: SubjectState) => state.editForm);

const getFilterForm = createSelector(getSubjectState, (state: SubjectState) => state.filterForm);

export const SubjectQuery = {
  getSubjectList: getSubject,
  getSubjectRequesting,
  getCreateForm,
  getFilterForm,
  getEditForm,
};
