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
  ChangeFilterSubject = '[Subject] ChangeFilterSubject',
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
  | ChangeFilterSubject;

export const fromSubjectActions = {
  GetSubjectRequest,
  GetSubjectResponse,
  GetSubjectError,
  CreateSubjectRequest,
  CreateSubjectResponse,
  CreateSubjectError,
  ChangeCreateSubject,
  ChangeFilterSubject,
};
