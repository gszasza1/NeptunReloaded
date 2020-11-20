import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SUBJECTCOURSE_FEATURE_KEY, SubjectCourseState } from './course-dialog.reducer';

const getSubjectCourseState = createFeatureSelector<SubjectCourseState>(SUBJECTCOURSE_FEATURE_KEY);

const getSubjectCourselist = createSelector(getSubjectCourseState, (state: SubjectCourseState) =>
  state.filterForm.length > 0 ? state.list.filter((x) => x.name.includes(state.filterForm)) : state.list
);

const getSubjectCourseRequesting = createSelector(
  getSubjectCourseState,
  (state: SubjectCourseState) => state.isRequesting
);

const getCreateForm = createSelector(getSubjectCourseState, (state: SubjectCourseState) => state.createForm);
const getEditForm = createSelector(getSubjectCourseState, (state: SubjectCourseState) => state.editForm);

const getFilterForm = createSelector(getSubjectCourseState, (state: SubjectCourseState) => state.filterForm);

export const SubjectCourseQuery = {
  getSubjectCourselist,
  getSubjectCourseRequesting,
  getCreateForm,
  getFilterForm,
  getEditForm,
};
