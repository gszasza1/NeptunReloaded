import { Action } from '@ngrx/store';
import { CourseSelect } from 'src/app/shared/backend.interface';

export enum CourseSelectActionTypes {
  CourseSelectRequest = '[CourseSelect] CourseSelect Request',
  CourseSelectResponse = '[CourseSelect] CourseSelect Response',
  CourseSelectError = '[CourseSelect] CourseSelect Error',
}

export class CourseSelectRequest implements Action {
  readonly type = CourseSelectActionTypes.CourseSelectRequest;
}
export class CourseSelectResponse implements Action {
  readonly type = CourseSelectActionTypes.CourseSelectResponse;
  constructor(public payload: CourseSelect[]) {}
}
export class CourseSelectError implements Action {
  readonly type = CourseSelectActionTypes.CourseSelectError;
}

export type CourseSelectAction = CourseSelectRequest | CourseSelectResponse | CourseSelectError;

export const fromCourseSelectActions = {
  CourseSelectRequest,
  CourseSelectResponse,
  CourseSelectError,
};
