import { Action } from '@ngrx/store';
import { Exams } from 'src/app/shared/backend.interface';

export enum MyExamsActionTypes {
  GetMyExamsRequest = '[MyExams] GetMyExams Request',
  GetMyExamsResponse = '[MyExams] GetMyExams Response',
  GetMyExamsError = '[MyExams] GetMyExams Error',
}

export class GetMyExamsRequest implements Action {
  readonly type = MyExamsActionTypes.GetMyExamsRequest;
}
export class GetMyExamsResponse implements Action {
  readonly type = MyExamsActionTypes.GetMyExamsResponse;
  constructor(public payload: Exams[]) {}
}
export class GetMyExamsError implements Action {
  readonly type = MyExamsActionTypes.GetMyExamsError;
}

export type MyExamsAction = GetMyExamsRequest | GetMyExamsResponse | GetMyExamsError;

export const fromMyExamsActions = {
  GetMyExamsRequest,
  GetMyExamsResponse,
  GetMyExamsError,
};
