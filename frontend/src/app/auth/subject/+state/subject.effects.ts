import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { SubjectService } from '../subject.service';
import {
  CreateSubjectError,
  CreateSubjectResponse,
  GetSubjectError,
  GetSubjectResponse,
  SubjectActionTypes,
} from './subject.actions';
import { SubjectQuery } from './subject.selector';

@Injectable()
export class SubjectEffects {
  @Effect() GetSubject$ = this.actions$.pipe(
    ofType(SubjectActionTypes.GetSubjectRequest),
    mergeMap(() =>
      this.service.getSubjects().pipe(
        map((x) => new GetSubjectResponse(x)),
        catchError(async () => new GetSubjectError())
      )
    )
  );

  @Effect() createSubject$ = this.actions$.pipe(
    ofType(SubjectActionTypes.CreateSubjectRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.createSubject(SubjectQuery.getCreateForm(storeState)).pipe(
        map(() => new CreateSubjectResponse()),
        catchError(async () => new CreateSubjectError())
      )
    )
  );

  constructor(private service: SubjectService, private actions$: Actions, private store: Store<{}>) {}
}
