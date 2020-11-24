import { Action } from '@ngrx/store';
import { SubjectSelect } from 'src/app/shared/backend.interface';

export enum SubjectSelectActionTypes {
  SubjectSelectRequest = '[SubjectSelect] SubjectSelect Request',
  SubjectSelectResponse = '[SubjectSelect] SubjectSelect Response',
  SubjectSelectError = '[SubjectSelect] SubjectSelect Error',
}

export class SubjectSelectRequest implements Action {
  readonly type = SubjectSelectActionTypes.SubjectSelectRequest;
}
export class SubjectSelectResponse implements Action {
  readonly type = SubjectSelectActionTypes.SubjectSelectResponse;
  constructor(public payload: SubjectSelect[]) {}
}
export class SubjectSelectError implements Action {
  readonly type = SubjectSelectActionTypes.SubjectSelectError;
}

export type SubjectSelectAction = SubjectSelectRequest | SubjectSelectResponse | SubjectSelectError;

export const fromSubjectSelectActions = {
  SubjectSelectRequest,
  SubjectSelectResponse,
  SubjectSelectError,
};
