import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { MyExamsService } from '../my-exams.service';
import { GetMyExamsError, GetMyExamsResponse, MyExamsActionTypes } from './my-exams.actions';

@Injectable()
export class MyExamsEffects {
  @Effect() getMyExams$ = this.actions$.pipe(
    ofType(MyExamsActionTypes.GetMyExamsRequest),
    mergeMap(() =>
      this.service.getExams().pipe(
        map((x) => new GetMyExamsResponse(x)),
        catchError(async () => new GetMyExamsError())
      )
    )
  );

  constructor(private service: MyExamsService, private actions$: Actions, private store: Store<{}>) {}
}
