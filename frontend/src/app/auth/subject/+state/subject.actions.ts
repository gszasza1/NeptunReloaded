import { Action } from '@ngrx/store';
import { Subject } from 'src/app/shared/backend.interface';

export enum SubjectActionTypes {
  GetSubjectRequest = '[Subject] GetSubject Request',
  GetSubjectResponse = '[Subject] GetSubject Response',
  GetSubjectError = '[Subject] GetSubject Error',

  CreateSubjectRequest = '[Subject] CreateSubject Request',
  CreateSubjectResponse = '[Subject] CreateSubject Response',
  CreateSubjectError = '[Subject] CreateSubject Error',
  ChangeCreateSubject = '[Subject] ChangeCreateSubject',

  EditSubjectRequest = '[Subject] EditSubject Request',
  EditSubjectResponse = '[Subject] EditSubject Response',
  EditSubjectError = '[Subject] EditSubject Error',
  ChangeEditSubject = '[Subject] ChangeEditSubject',

  ChangeFilterSubject = '[Subject] ChangeFilterSubject',
}

export class ChangeEditSubject implements Action {
  readonly type = SubjectActionTypes.ChangeEditSubject;
  constructor(public payload: string) {}
}
export class EditSubjectRequest implements Action {
  readonly type = SubjectActionTypes.EditSubjectRequest;
  constructor(public payload: number) {}
}
export class EditSubjectResponse implements Action {
  readonly type = SubjectActionTypes.EditSubjectResponse;
}
export class EditSubjectError implements Action {
  readonly type = SubjectActionTypes.EditSubjectError;
}
export class ChangeFilterSubject implements Action {
  readonly type = SubjectActionTypes.ChangeFilterSubject;
  constructor(public payload: string) {}
}
export class ChangeCreateSubject implements Action {
  readonly type = SubjectActionTypes.ChangeCreateSubject;
  constructor(public payload: string) {}
}
export class CreateSubjectRequest implements Action {
  readonly type = SubjectActionTypes.CreateSubjectRequest;
}
export class CreateSubjectResponse implements Action {
  readonly type = SubjectActionTypes.CreateSubjectResponse;
}
export class CreateSubjectError implements Action {
  readonly type = SubjectActionTypes.CreateSubjectError;
}
export class GetSubjectRequest implements Action {
  readonly type = SubjectActionTypes.GetSubjectRequest;
}
export class GetSubjectResponse implements Action {
  readonly type = SubjectActionTypes.GetSubjectResponse;
  constructor(public payload: Subject[]) {}
}
export class GetSubjectError implements Action {
  readonly type = SubjectActionTypes.GetSubjectError;
}

export type SubjectAction =
  | GetSubjectRequest
  | GetSubjectResponse
  | GetSubjectError
  | CreateSubjectRequest
  | CreateSubjectResponse
  | CreateSubjectError
  | ChangeCreateSubject
  | ChangeFilterSubject
  | EditSubjectRequest
  | EditSubjectResponse
  | EditSubjectError
  | ChangeEditSubject;

export const fromSubjectActions = {
  GetSubjectRequest,
  GetSubjectResponse,
  GetSubjectError,
  CreateSubjectRequest,
  CreateSubjectResponse,
  CreateSubjectError,
  ChangeCreateSubject,
  ChangeFilterSubject,
  EditSubjectRequest,
  EditSubjectResponse,
  EditSubjectError,
  ChangeEditSubject,
};
