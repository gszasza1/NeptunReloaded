import { Action } from '@ngrx/store';
import { CourseResultsExtended } from 'src/app/shared/backend.interface';

export enum MyResultActionTypes {
  GetMyResultRequest = '[MyResult] GetMyResult Request',
  GetMyResultResponse = '[MyResult] GetMyResult Response',
  GetMyResultError = '[MyResult] GetMyResult Error',
}

export class GetMyResultRequest implements Action {
  readonly type = MyResultActionTypes.GetMyResultRequest;
}
export class GetMyResultResponse implements Action {
  readonly type = MyResultActionTypes.GetMyResultResponse;
  constructor(public payload: CourseResultsExtended[]) {}
}
export class GetMyResultError implements Action {
  readonly type = MyResultActionTypes.GetMyResultError;
}

export type MyResultAction = GetMyResultRequest | GetMyResultResponse | GetMyResultError;

export const fromMyResultActions = {
  GetMyResultRequest,
  GetMyResultResponse,
  GetMyResultError,
};
