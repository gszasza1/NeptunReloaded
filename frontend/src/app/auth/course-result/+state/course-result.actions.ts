import { Action } from '@ngrx/store';
import { CreateCourseResult } from 'src/app/shared/backend.interface';

export enum CourseResultActionTypes {
  ChangeCourseResultFilter = '[CourseResult] Change CourseResult Filter',
  GetCourseResultRequest = '[CourseResult] CourseResult Request',
  GetCourseResultResponse = '[CourseResult] CourseResult Response',
  GetCourseResultError = '[CourseResult] CourseResult Error',

  CreateCourseResultRequest = '[CourseResult] CreateCourseResult Request',
  CreateCourseResultResponse = '[CourseResult] CreateCourseResult Response',
  CreateCourseResultError = '[CourseResult] CreateCourseResult Error',
  ChangeCreateCourseResult = '[CourseResult] ChangeCreateCourseResult',
}

export class ChangeCreateCourseResult implements Action {
  readonly type = CourseResultActionTypes.ChangeCreateCourseResult;
  constructor(public payload: CreateCourseResult) {}
}
export class ChangeCourseResultFilter implements Action {
  readonly type = CourseResultActionTypes.ChangeCourseResultFilter;
  constructor(public payload: string) {}
}
export class GetCourseResultRequest implements Action {
  readonly type = CourseResultActionTypes.GetCourseResultRequest;
}
export class GetCourseResultResponse implements Action {
  readonly type = CourseResultActionTypes.GetCourseResultResponse;
  constructor(public payload: any) {}
}
export class GetCourseResultError implements Action {
  readonly type = CourseResultActionTypes.GetCourseResultError;
}

export class CreateCourseResultRequest implements Action {
  readonly type = CourseResultActionTypes.CreateCourseResultRequest;
}
export class CreateCourseResultResponse implements Action {
  readonly type = CourseResultActionTypes.CreateCourseResultResponse;
}
export class CreateCourseResultError implements Action {
  readonly type = CourseResultActionTypes.CreateCourseResultError;
}

export type CourseResultAction =
  | ChangeCourseResultFilter
  | GetCourseResultRequest
  | GetCourseResultResponse
  | GetCourseResultError
  | CreateCourseResultRequest
  | CreateCourseResultResponse
  | CreateCourseResultError
  | ChangeCreateCourseResult;

export const fromCourseResultActions = {
  ChangeCourseResultFilter,
  GetCourseResultRequest,
  GetCourseResultResponse,
  GetCourseResultError,
  CreateCourseResultRequest,
  CreateCourseResultResponse,
  CreateCourseResultError,
  ChangeCreateCourseResult,
};
