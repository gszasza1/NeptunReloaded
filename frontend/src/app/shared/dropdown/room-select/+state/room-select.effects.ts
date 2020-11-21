import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { DropdownService } from '../../dropdown.service';
import { RoomSelectActionTypes, RoomSelectError, RoomSelectResponse } from './room-select.actions';

@Injectable()
export class RoomSelectEffects {
  @Effect() Login$ = this.actions$.pipe(
    ofType(RoomSelectActionTypes.RoomSelectRequest),
    mergeMap(() =>
      this.service.getRooms().pipe(
        map((x) => new RoomSelectResponse(x)),
        catchError(async () => new RoomSelectError())
      )
    )
  );

  constructor(private service: DropdownService, private actions$: Actions) {}
}
