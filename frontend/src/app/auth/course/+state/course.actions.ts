import { Action } from '@ngrx/store';
import { CourseList } from 'src/app/shared/backend.interface';

export enum CourseActionTypes {
  GetCourseRequest = '[Course] GetCourse Request',
  GetCourseResponse = '[Course] GetCourse Response',
  GetCourseError = '[Course] GetCourse Error',

  CreateCourseRequest = '[Course] CreateCourse Request',
  CreateCourseResponse = '[Course] CreateCourse Response',
  CreateCourseError = '[Course] CreateCourse Error',
  ChangeCreateCourse = '[Course] ChangeCreateCourse',

  EditCourseRequest = '[Course] EditCourse Request',
  EditCourseResponse = '[Course] EditCourse Response',
  EditCourseError = '[Course] EditCourse Error',
  ChangeEditCourse = '[Course] ChangeEditCourse',

  ChangeFilterCourse = '[Course] ChangeFilterCourse',
}

export class ChangeEditCourse implements Action {
  readonly type = CourseActionTypes.ChangeEditCourse;
  constructor(public payload: string) {}
}
export class EditCourseRequest implements Action {
  readonly type = CourseActionTypes.EditCourseRequest;
  constructor(public payload: number) {}
}
export class EditCourseResponse implements Action {
  readonly type = CourseActionTypes.EditCourseResponse;
}
export class EditCourseError implements Action {
  readonly type = CourseActionTypes.EditCourseError;
}
export class ChangeFilterCourse implements Action {
  readonly type = CourseActionTypes.ChangeFilterCourse;
  constructor(public payload: string) {}
}
export class ChangeCreateCourse implements Action {
  readonly type = CourseActionTypes.ChangeCreateCourse;
  constructor(public payload: string) {}
}
export class CreateCourseRequest implements Action {
  readonly type = CourseActionTypes.CreateCourseRequest;
}
export class CreateCourseResponse implements Action {
  readonly type = CourseActionTypes.CreateCourseResponse;
}
export class CreateCourseError implements Action {
  readonly type = CourseActionTypes.CreateCourseError;
}
export class GetCourseRequest implements Action {
  readonly type = CourseActionTypes.GetCourseRequest;
}
export class GetCourseResponse implements Action {
  readonly type = CourseActionTypes.GetCourseResponse;
  constructor(public payload: CourseList[]) {}
}
export class GetCourseError implements Action {
  readonly type = CourseActionTypes.GetCourseError;
}

export type CourseAction =
  | GetCourseRequest
  | GetCourseResponse
  | GetCourseError
  | CreateCourseRequest
  | CreateCourseResponse
  | CreateCourseError
  | ChangeCreateCourse
  | ChangeFilterCourse
  | EditCourseRequest
  | EditCourseResponse
  | EditCourseError
  | ChangeEditCourse;

export const fromCourseActions = {
  GetCourseRequest,
  GetCourseResponse,
  GetCourseError,
  CreateCourseRequest,
  CreateCourseResponse,
  CreateCourseError,
  ChangeCreateCourse,
  ChangeFilterCourse,
  EditCourseRequest,
  EditCourseResponse,
  EditCourseError,
  ChangeEditCourse,
};
