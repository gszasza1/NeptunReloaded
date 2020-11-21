import { Action } from '@ngrx/store';
import { LoginUser } from 'src/app/shared/backend.interface';

export enum ExamResultActionTypes {
  ChangeExamResult = '[ExamResult] Change ExamResult',
  GetExamResultRequest = '[ExamResult] ExamResult Request',
  GetExamResultResponse = '[ExamResult] ExamResult Response',
  GetExamResultError = '[ExamResult] ExamResult Error',

  CreateExamResultRequest = '[ExamResult] CreateExamResult Request',
  CreateExamResultResponse = '[ExamResult] CreateExamResult Response',
  CreateExamResultError = '[ExamResult] CreateExamResult Error',
  ChangeCreateExamResult = '[ExamResult] ChangeCreateExamResult',
}

export class ChangeExamResult implements Action {
  readonly type = ExamResultActionTypes.ChangeExamResult;
  constructor(public payload: LoginUser) {}
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
  constructor(public payload: any) {}
}
export class CreateExamResultError implements Action {
  readonly type = ExamResultActionTypes.CreateExamResultError;
}

export type ExamResultAction = ChangeExamResult | GetExamResultRequest | GetExamResultResponse | GetExamResultError;

export const fromExamResultActions = {
  ChangeExamResult,
  GetExamResultRequest,
  GetExamResultResponse,
  GetExamResultError,
};
