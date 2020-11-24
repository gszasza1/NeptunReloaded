import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { CourseResultService } from '../course-result.service';
import {
  CourseResultActionTypes,
  CreateCourseResultError,
  CreateCourseResultResponse,
  GetCourseResultError,
  GetCourseResultRequest,
  GetCourseResultResponse,
} from './course-result.actions';
import { CourseResultQuery } from './course-result.selector';

@Injectable()
export class CourseResultEffects {
  @Effect() GetCourseResult$ = this.actions$.pipe(
    ofType(CourseResultActionTypes.GetCourseResultRequest),
    mergeMap(() =>
      this.service.getCourseResults().pipe(
        map((x) => new GetCourseResultResponse(x)),
        catchError(async () => new GetCourseResultError())
      )
    )
  );

  @Effect() createCourseResult$ = this.actions$.pipe(
    ofType(CourseResultActionTypes.CreateCourseResultRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.createCourseResult(CourseResultQuery.getCreateForm(storeState)).pipe(
        map(() => new CreateCourseResultResponse()),
        catchError(async () => new CreateCourseResultError())
      )
    )
  );
  @Effect() refreshList$ = this.actions$.pipe(
    ofType(CourseResultActionTypes.CreateCourseResultResponse),
    map(() => new GetCourseResultRequest())
  );

  constructor(
    private service: CourseResultService,
    private router: Router,
    private store: Store<{}>,
    private actions$: Actions
  ) {}
}
