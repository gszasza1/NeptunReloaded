import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CourseResult_FEATURE_KEY, CourseResultState } from './course-result.reducer';

const getCourseResultState = createFeatureSelector<CourseResultState>(CourseResult_FEATURE_KEY);

const getCourseResultList = createSelector(getCourseResultState, (state: CourseResultState) =>
  state.filterForm.length > 0 ? state.list.filter((x) => x.neptun.includes(state.filterForm)) : state.list
);

const getCourseResultRequesting = createSelector(
  getCourseResultState,
  (state: CourseResultState) => state.isRequesting
);

const getCreateForm = createSelector(getCourseResultState, (state: CourseResultState) => state.createForm);
const getFilterForm = createSelector(getCourseResultState, (state: CourseResultState) => state.filterForm);

export const CourseResultQuery = {
  getCourseResultList,
  getCourseResultRequesting,
  getCreateForm,
  getFilterForm,
};
