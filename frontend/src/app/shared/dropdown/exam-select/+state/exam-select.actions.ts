import { Action } from '@ngrx/store';
import { ExamSelect } from 'src/app/shared/backend.interface';

export enum ExamSelectActionTypes {
  ExamSelectRequest = '[ExamSelect] ExamSelect Request',
  ExamSelectResponse = '[ExamSelect] ExamSelect Response',
  ExamSelectError = '[ExamSelect] ExamSelect Error',
}

export class ExamSelectRequest implements Action {
  readonly type = ExamSelectActionTypes.ExamSelectRequest;
}
export class ExamSelectResponse implements Action {
  readonly type = ExamSelectActionTypes.ExamSelectResponse;
  constructor(public payload: ExamSelect[]) {}
}
export class ExamSelectError implements Action {
  readonly type = ExamSelectActionTypes.ExamSelectError;
}

export type ExamSelectAction = ExamSelectRequest | ExamSelectResponse | ExamSelectError;

export const fromExamSelectActions = {
  ExamSelectRequest,
  ExamSelectResponse,
  ExamSelectError,
};
