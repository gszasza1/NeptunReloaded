import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { CourseService } from '../course.service';
import {
  CourseActionTypes,
  CreateCourseError,
  CreateCourseResponse,
  EditCourseError,
  EditCourseRequest,
  EditCourseResponse,
  GetCourseError,
  GetCourseRequest,
  GetCourseResponse,
} from './course.actions';
import { CourseQuery } from './course.selector';

@Injectable()
export class CourseEffects {
  @Effect() GetCourse$ = this.actions$.pipe(
    ofType(CourseActionTypes.GetCourseRequest),
    mergeMap(() =>
      this.service.getCourses().pipe(
        map((x) => new GetCourseResponse(x)),
        catchError(async () => new GetCourseError())
      )
    )
  );

  @Effect() createCourse$ = this.actions$.pipe(
    ofType(CourseActionTypes.CreateCourseRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.createCourse(CourseQuery.getCreateForm(storeState)).pipe(
        map(() => new CreateCourseResponse()),
        catchError(async () => new CreateCourseError())
      )
    )
  );
  @Effect() editCourse$ = this.actions$.pipe(
    ofType(CourseActionTypes.EditCourseRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.editCourse((action as EditCourseRequest).payload, CourseQuery.getEditForm(storeState)).pipe(
        map(() => new EditCourseResponse()),
        catchError(async () => new EditCourseError())
      )
    )
  );
  @Effect() refreshList$ = this.actions$.pipe(
    ofType(CourseActionTypes.EditCourseResponse, CourseActionTypes.CreateCourseResponse),
    map(() => new GetCourseRequest())
  );

  constructor(private service: CourseService, private actions$: Actions, private store: Store<{}>) {}
}
