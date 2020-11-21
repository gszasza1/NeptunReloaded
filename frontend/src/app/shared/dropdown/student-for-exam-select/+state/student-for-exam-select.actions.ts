import { Action } from '@ngrx/store';
import { StudentForExamSelect } from 'src/app/shared/backend.interface';

export enum StudentForExamSelectActionTypes {
  StudentForExamSelectRequest = '[StudentForExamSelect] StudentForExamSelect Request',
  StudentForExamSelectResponse = '[StudentForExamSelect] StudentForExamSelect Response',
  StudentForExamSelectError = '[StudentForExamSelect] StudentForExamSelect Error',
}

export class StudentForExamSelectRequest implements Action {
  readonly type = StudentForExamSelectActionTypes.StudentForExamSelectRequest;
  constructor(public payload: number) {}
}
export class StudentForExamSelectResponse implements Action {
  readonly type = StudentForExamSelectActionTypes.StudentForExamSelectResponse;
  constructor(public payload: StudentForExamSelect[]) {}
}
export class StudentForExamSelectError implements Action {
  readonly type = StudentForExamSelectActionTypes.StudentForExamSelectError;
}

export type StudentForExamSelectAction =
  | StudentForExamSelectRequest
  | StudentForExamSelectResponse
  | StudentForExamSelectError;

export const fromStudentForExamSelectActions = {
  StudentForExamSelectRequest,
  StudentForExamSelectResponse,
  StudentForExamSelectError,
};
