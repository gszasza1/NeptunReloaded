import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { ExamResultService } from '../exam-result.service';
import {
  CreateExamResultError,
  CreateExamResultResponse,
  ExamResultActionTypes,
  GetExamResultError,
  GetExamResultRequest,
  GetExamResultResponse,
} from './exam-result.actions';
import { ExamResultQuery } from './exam-result.selector';

@Injectable()
export class ExamResultEffects {
  @Effect() GetExamResult$ = this.actions$.pipe(
    ofType(ExamResultActionTypes.GetExamResultRequest),
    mergeMap(() =>
      this.service.getExamResults().pipe(
        map((x) => new GetExamResultResponse(x)),
        catchError(async () => new GetExamResultError())
      )
    )
  );

  @Effect() createExamResult$ = this.actions$.pipe(
    ofType(ExamResultActionTypes.CreateExamResultRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.createExamResult(ExamResultQuery.getCreateForm(storeState)).pipe(
        map(() => new CreateExamResultResponse()),
        catchError(async () => new CreateExamResultError())
      )
    )
  );
  @Effect() refreshList$ = this.actions$.pipe(
    ofType(ExamResultActionTypes.CreateExamResultResponse),
    map(() => new GetExamResultRequest())
  );

  constructor(
    private service: ExamResultService,
    private router: Router,
    private store: Store<{}>,
    private actions$: Actions
  ) {}
}
