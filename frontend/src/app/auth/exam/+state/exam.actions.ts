import { Action } from '@ngrx/store';
import { CreateExam, Exams } from 'src/app/shared/backend.interface';

export enum ExamActionTypes {
  GetExamRequest = '[Exam] GetExam Request',
  GetExamResponse = '[Exam] GetExam Response',
  GetExamError = '[Exam] GetExam Error',

  CreateExamRequest = '[Exam] CreateExam Request',
  CreateExamResponse = '[Exam] CreateExam Response',
  CreateExamError = '[Exam] CreateExam Error',
  ChangeCreateExam = '[Exam] ChangeCreateExam',

  EditExamRequest = '[Exam] EditExam Request',
  EditExamResponse = '[Exam] EditExam Response',
  EditExamError = '[Exam] EditExam Error',
  ChangeEditExam = '[Exam] ChangeEditExam',

  ChangeFilterExam = '[Exam] ChangeFilterExam',

  JoinExamRequest = '[Exam] JoinExam Request',
  JoinExamResponse = '[Exam] JoinExam Response',
  JoinExamError = '[Exam] JoinExam Error',
}

export class JoinExamRequest implements Action {
  readonly type = ExamActionTypes.JoinExamRequest;
  constructor(public payload: number) {}
}
export class JoinExamResponse implements Action {
  readonly type = ExamActionTypes.JoinExamResponse;
}
export class JoinExamError implements Action {
  readonly type = ExamActionTypes.JoinExamError;
}
export class ChangeEditExam implements Action {
  readonly type = ExamActionTypes.ChangeEditExam;
  constructor(public payload: string) {}
}
export class EditExamRequest implements Action {
  readonly type = ExamActionTypes.EditExamRequest;
  constructor(public payload: number) {}
}
export class EditExamResponse implements Action {
  readonly type = ExamActionTypes.EditExamResponse;
}
export class EditExamError implements Action {
  readonly type = ExamActionTypes.EditExamError;
}
export class ChangeFilterExam implements Action {
  readonly type = ExamActionTypes.ChangeFilterExam;
  constructor(public payload: string) {}
}
export class ChangeCreateExam implements Action {
  readonly type = ExamActionTypes.ChangeCreateExam;
  constructor(public payload: CreateExam) {}
}
export class CreateExamRequest implements Action {
  readonly type = ExamActionTypes.CreateExamRequest;
}
export class CreateExamResponse implements Action {
  readonly type = ExamActionTypes.CreateExamResponse;
}
export class CreateExamError implements Action {
  readonly type = ExamActionTypes.CreateExamError;
}
export class GetExamRequest implements Action {
  readonly type = ExamActionTypes.GetExamRequest;
}
export class GetExamResponse implements Action {
  readonly type = ExamActionTypes.GetExamResponse;
  constructor(public payload: Exams[]) {}
}
export class GetExamError implements Action {
  readonly type = ExamActionTypes.GetExamError;
}

export type ExamAction =
  | GetExamRequest
  | GetExamResponse
  | GetExamError
  | CreateExamRequest
  | CreateExamResponse
  | CreateExamError
  | ChangeCreateExam
  | ChangeFilterExam
  | EditExamRequest
  | EditExamResponse
  | EditExamError
  | ChangeEditExam
  | JoinExamRequest
  | JoinExamResponse
  | JoinExamError;

export const fromExamActions = {
  GetExamRequest,
  GetExamResponse,
  GetExamError,
  CreateExamRequest,
  CreateExamResponse,
  CreateExamError,
  ChangeCreateExam,
  ChangeFilterExam,
  EditExamRequest,
  EditExamResponse,
  EditExamError,
  ChangeEditExam,
  JoinExamRequest,
  JoinExamResponse,
  JoinExamError,
};
