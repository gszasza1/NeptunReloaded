import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { DropdownService } from '../../dropdown.service';
import {
  StudentForExamSelectActionTypes,
  StudentForExamSelectError,
  StudentForExamSelectResponse,
} from './student-for-exam-select.actions';

@Injectable()
export class StudentForExamSelectEffects {
  @Effect() Login$ = this.actions$.pipe(
    ofType(StudentForExamSelectActionTypes.StudentForExamSelectRequest),
    mergeMap(() =>
      this.service.getStudentForExams().pipe(
        map((x) => new StudentForExamSelectResponse(x)),
        catchError(async () => new StudentForExamSelectError())
      )
    )
  );

  constructor(private service: DropdownService, private actions$: Actions) {}
}
