import { createFeatureSelector, createSelector } from '@ngrx/store';

import { STUDENT_FOR_EXAM_SELECT_FEATURE_KEY, StudentForExamSelectState } from './student-for-exam-select.reducer';

const getStudentForExamSelectState = createFeatureSelector<StudentForExamSelectState>(
  STUDENT_FOR_EXAM_SELECT_FEATURE_KEY
);
const getStudentForExamSelectList = createSelector(
  getStudentForExamSelectState,
  (state: StudentForExamSelectState) => state.list
);
const getStudentForExamSelectRequesting = createSelector(
  getStudentForExamSelectState,
  (state: StudentForExamSelectState) => state.isRequesting
);

export const StudentForExamSelectQuery = {
  getStudentForExamSelectList,
  getStudentForExamSelectRequesting,
};
