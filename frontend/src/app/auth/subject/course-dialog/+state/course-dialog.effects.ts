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
import { SubjectCourseQuery } from './course-dialog.selector';

@Injectable()
export class SubjectCourseEffects {
  @Effect() GetSubjectCourseCourse$ = this.actions$.pipe(
    ofType(SubjectCourseActionTypes.GetSubjectCourseRequest),
    mergeMap((action) =>
      this.service.getCoursesForSubject((action as GetSubjectCourseRequest).payload).pipe(
        map((x) => new GetSubjectCourseResponse(x)),
        catchError(async () => new GetSubjectCourseError())
      )
    )
  );

  @Effect() joinSubjectCourse$ = this.actions$.pipe(
    ofType(SubjectCourseActionTypes.JoinSubjectCourseRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.join({courseId: (action as JoinSubjectCourseRequest).payload}).pipe(
        map(() => new JoinSubjectCourseResponse()),
        catchError(async () => new JoinSubjectCourseError())
      )
    )
  );

  @Effect() refreshList$ = this.actions$.pipe(
    ofType(SubjectCourseActionTypes.JoinSubjectCourseResponse),
    withLatestFrom(this.store),
    mergeMap(async ([action, storeState]) => new GetSubjectCourseRequest(SubjectCourseQuery.getCurrentSubject(storeState)))
  );

  constructor(private service: CourseDialogService, private actions$: Actions, private store: Store<{}>) {}
}
