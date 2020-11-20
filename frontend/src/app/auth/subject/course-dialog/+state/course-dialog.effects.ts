import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { CourseDialogService } from '../course-dialog.service';
import {
  GetSubjectCourseError,
  GetSubjectCourseRequest,
  GetSubjectCourseResponse,
  JoinSubjectCourseError,
  JoinSubjectCourseRequest,
  JoinSubjectCourseResponse,
  SubjectCourseActionTypes,
} from './course-dialog.actions';

@Injectable()
export class SubjectCourseEffects {
  @Effect() GetSubjectCourseCourse$ = this.actions$.pipe(
    ofType(SubjectCourseActionTypes.GetSubjectCourseRequest),
    mergeMap(() =>
      this.service.getCoursesForSubject().pipe(
        map((x) => new GetSubjectCourseResponse(x)),
        catchError(async () => new GetSubjectCourseError())
      )
    )
  );

  @Effect() joinSubjectCourse$ = this.actions$.pipe(
    ofType(SubjectCourseActionTypes.JoinSubjectCourseRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.join((action as JoinSubjectCourseRequest).payload).pipe(
        map(() => new JoinSubjectCourseResponse()),
        catchError(async () => new JoinSubjectCourseError())
      )
    )
  );

  @Effect() refreshList$ = this.actions$.pipe(
    ofType(SubjectCourseActionTypes.JoinSubjectCourseResponse),
    map(() => new GetSubjectCourseRequest())
  );

  constructor(private service: CourseDialogService, private actions$: Actions, private store: Store<{}>) {}
}
