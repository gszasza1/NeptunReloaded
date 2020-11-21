import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { DropdownService } from '../../dropdown.service';
import { SubjectSelectActionTypes, SubjectSelectError, SubjectSelectResponse } from './Subject-select.actions';

@Injectable()
export class SubjectSelectEffects {
  @Effect() Login$ = this.actions$.pipe(
    ofType(SubjectSelectActionTypes.SubjectSelectRequest),
    mergeMap(() =>
      this.service.getSubjects().pipe(
        map((x) => new SubjectSelectResponse(x)),
        catchError(async () => new SubjectSelectError())
      )
    )
  );

  constructor(private service: DropdownService, private actions$: Actions) {}
}
