import { Action } from '@ngrx/store';
import { CoursesPopUp } from 'src/app/shared/backend.interface';

export enum SubjectCourseActionTypes {
  GetSubjectCourseRequest = '[SubjectCourse] GetSubjectCourse Request',
  GetSubjectCourseResponse = '[SubjectCourse] GetSubjectCourse Response',
  GetSubjectCourseError = '[SubjectCourse] GetSubjectCourse Error',

  ChangeFilterSubjectCourse = '[SubjectCourse] ChangeFilterSubjectCourse',

  JoinSubjectCourseRequest = '[SubjectCourse] JoinSubjectCourse Request',
  JoinSubjectCourseResponse = '[SubjectCourse] JoinSubjectCourse Response',
  JoinSubjectCourseError = '[SubjectCourse] JoinSubjectCourse Error',
}

export class ChangeFilterSubjectCourse implements Action {
  readonly type = SubjectCourseActionTypes.ChangeFilterSubjectCourse;
  constructor(public payload: string) {}
}

export class GetSubjectCourseRequest implements Action {
  readonly type = SubjectCourseActionTypes.GetSubjectCourseRequest;
}
export class GetSubjectCourseResponse implements Action {
  readonly type = SubjectCourseActionTypes.GetSubjectCourseResponse;
  constructor(public payload: CoursesPopUp[]) {}
}
export class GetSubjectCourseError implements Action {
  readonly type = SubjectCourseActionTypes.GetSubjectCourseError;
}
export class JoinSubjectCourseRequest implements Action {
  readonly type = SubjectCourseActionTypes.JoinSubjectCourseRequest;
  constructor(public payload: number) {}
}
export class JoinSubjectCourseResponse implements Action {
  readonly type = SubjectCourseActionTypes.JoinSubjectCourseResponse;
}
export class JoinSubjectCourseError implements Action {
  readonly type = SubjectCourseActionTypes.JoinSubjectCourseError;
}

export type SubjectCourseAction =
  | GetSubjectCourseRequest
  | GetSubjectCourseResponse
  | GetSubjectCourseError
  | ChangeFilterSubjectCourse
  | JoinSubjectCourseRequest
  | JoinSubjectCourseResponse
  | JoinSubjectCourseError;

export const fromSubjectCourseActions = {
  GetSubjectCourseRequest,
  GetSubjectCourseResponse,
  GetSubjectCourseError,
  ChangeFilterSubjectCourse,
  JoinSubjectCourseRequest,
  JoinSubjectCourseResponse,
  JoinSubjectCourseError,
};
