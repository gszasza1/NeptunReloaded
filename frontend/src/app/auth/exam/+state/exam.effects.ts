import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { ExamService } from '../exam.service';
import {
  CreateExamError,
  CreateExamResponse,
  EditExamError,
  EditExamRequest,
  EditExamResponse,
  ExamActionTypes,
  GetExamError,
  GetExamRequest,
  GetExamResponse,
} from './exam.actions';
import { ExamQuery } from './exam.selector';

@Injectable()
export class ExamsEffects {
  @Effect() getExams$ = this.actions$.pipe(
    ofType(ExamActionTypes.GetExamRequest),
    mergeMap(() =>
      this.service.getExams().pipe(
        map((x) => new GetExamResponse(x)),
        catchError(async () => new GetExamError())
      )
    )
  );

  @Effect() createExams$ = this.actions$.pipe(
    ofType(ExamActionTypes.CreateExamRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.createExams(ExamQuery.getCreateForm(storeState)).pipe(
        map(() => new CreateExamResponse()),
        catchError(async () => new CreateExamError())
      )
    )
  );
  @Effect() editExams$ = this.actions$.pipe(
    ofType(ExamActionTypes.EditExamRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.editExams((action as EditExamRequest).payload, ExamQuery.getEditForm(storeState)).pipe(
        map(() => new EditExamResponse()),
        catchError(async () => new EditExamError())
      )
    )
  );
  @Effect() refreshList$ = this.actions$.pipe(
    ofType(ExamActionTypes.EditExamResponse, ExamActionTypes.CreateExamResponse),
    map(() => new GetExamRequest())
  );

  constructor(private service: ExamService, private actions$: Actions, private store: Store<{}>) {}
}