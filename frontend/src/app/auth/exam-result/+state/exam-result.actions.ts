import { Action } from '@ngrx/store';
import { CreateExamResult } from 'src/app/shared/backend.interface';

export enum ExamResultActionTypes {
  ChangeExamResultFilter = '[ExamResult] Change ExamResult Filter',
  GetExamResultRequest = '[ExamResult] ExamResult Request',
  GetExamResultResponse = '[ExamResult] ExamResult Response',
  GetExamResultError = '[ExamResult] ExamResult Error',

  CreateExamResultRequest = '[ExamResult] CreateExamResult Request',
  CreateExamResultResponse = '[ExamResult] CreateExamResult Response',
  CreateExamResultError = '[ExamResult] CreateExamResult Error',
  ChangeCreateExamResult = '[ExamResult] ChangeCreateExamResult',
}

export class ChangeCreateExamResult implements Action {
  readonly type = ExamResultActionTypes.ChangeCreateExamResult;
  constructor(public payload: CreateExamResult) {}
}
export class ChangeExamResultFilter implements Action {
  readonly type = ExamResultActionTypes.ChangeExamResultFilter;
  constructor(public payload: string) {}
}
export class GetExamResultRequest implements Action {
  readonly type = ExamResultActionTypes.GetExamResultRequest;
}
export class GetExamResultResponse implements Action {
  readonly type = ExamResultActionTypes.GetExamResultResponse;
  constructor(public payload: any) {}
}
export class GetExamResultError implements Action {
  readonly type = ExamResultActionTypes.GetExamResultError;
}

export class CreateExamResultRequest implements Action {
  readonly type = ExamResultActionTypes.CreateExamResultRequest;
}
export class CreateExamResultResponse implements Action {
  readonly type = ExamResultActionTypes.CreateExamResultResponse;
}
export class CreateExamResultError implements Action {
  readonly type = ExamResultActionTypes.CreateExamResultError;
}

export type ExamResultAction =
  | ChangeExamResultFilter
  | GetExamResultRequest
  | GetExamResultResponse
  | GetExamResultError
  | CreateExamResultRequest
  | CreateExamResultResponse
  | CreateExamResultError
  | ChangeCreateExamResult;

export const fromExamResultActions = {
  ChangeExamResultFilter,
  GetExamResultRequest,
  GetExamResultResponse,
  GetExamResultError,
  CreateExamResultRequest,
  CreateExamResultResponse,
  CreateExamResultError,
  ChangeCreateExamResult,
};
