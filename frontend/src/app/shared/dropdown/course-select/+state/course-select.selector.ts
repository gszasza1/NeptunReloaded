import { createFeatureSelector, createSelector } from '@ngrx/store';

import { COURSESELECT_FEATURE_KEY, CourseSelectState } from './course-select.reducer';

const getCourseSelectState = createFeatureSelector<CourseSelectState>(COURSESELECT_FEATURE_KEY);
const getCourseSelectList = createSelector(getCourseSelectState, (state: CourseSelectState) => state.list);
const getCourseSelectRequesting = createSelector(
  getCourseSelectState,
  (state: CourseSelectState) => state.isRequesting
);

export const CourseSelectQuery = {
  getCourseSelectList,
  getCourseSelectRequesting,
};
