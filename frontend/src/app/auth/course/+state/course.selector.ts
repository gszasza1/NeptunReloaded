import { createFeatureSelector, createSelector } from '@ngrx/store';

import { COURSE_FEATURE_KEY, CourseState } from './course.reducer';

const getCourseState = createFeatureSelector<CourseState>(COURSE_FEATURE_KEY);

const getCourseList = createSelector(getCourseState, (state: CourseState) =>
  state.filterForm.length > 0 ? state.list.filter((x) => x.name.includes(state.filterForm)) : state.list
);

const getCourseRequesting = createSelector(getCourseState, (state: CourseState) => state.isRequesting);

const getCreateForm = createSelector(getCourseState, (state: CourseState) => state.createForm);
const getEditForm = createSelector(getCourseState, (state: CourseState) => state.editForm);

const getFilterForm = createSelector(getCourseState, (state: CourseState) => state.filterForm);

export const CourseQuery = {
  getCourseList,
  getCourseRequesting,
  getCreateForm,
  getFilterForm,
  getEditForm,
};
