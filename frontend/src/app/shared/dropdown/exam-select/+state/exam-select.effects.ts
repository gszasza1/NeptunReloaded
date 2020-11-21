import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { DropdownService } from '../../dropdown.service';
import { ExamSelectActionTypes, ExamSelectError, ExamSelectResponse } from './exam-select.actions';

@Injectable()
export class ExamSelectEffects {
  @Effect() Login$ = this.actions$.pipe(
    ofType(ExamSelectActionTypes.ExamSelectRequest),
    mergeMap(() =>
      this.service.getExams().pipe(
        map((x) => new ExamSelectResponse(x)),
        catchError(async () => new ExamSelectError())
      )
    )
  );

  constructor(private service: DropdownService, private actions$: Actions) {}
}
