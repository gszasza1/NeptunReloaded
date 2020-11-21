import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { DropdownService } from '../../dropdown.service';
import { CourseSelectActionTypes, CourseSelectError, CourseSelectResponse } from './course-select.actions';

@Injectable()
export class CourseSelectEffects {
  @Effect() Login$ = this.actions$.pipe(
    ofType(CourseSelectActionTypes.CourseSelectRequest),
    mergeMap(() =>
      this.service.getCourses().pipe(
        map((x) => new CourseSelectResponse(x)),
        catchError(async () => new CourseSelectError())
      )
    )
  );

  constructor(private service: DropdownService, private actions$: Actions) {}
}
