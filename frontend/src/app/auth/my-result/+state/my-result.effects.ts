import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { MyResultService } from '../my-result.service';
import { GetMyResultError, GetMyResultResponse, MyResultActionTypes } from './my-result.actions';

@Injectable()
export class MyResultEffects {
  @Effect() getMyResult$ = this.actions$.pipe(
    ofType(MyResultActionTypes.GetMyResultRequest),
    mergeMap(() =>
      this.service.getCourseResults().pipe(
        map((x) => new GetMyResultResponse(x)),
        catchError(async () => new GetMyResultError())
      )
    )
  );

  constructor(private service: MyResultService, private actions$: Actions, private store: Store<{}>) {}
}
