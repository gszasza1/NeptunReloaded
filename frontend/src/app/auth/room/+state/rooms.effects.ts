import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { RoomService } from '../rooms.service';
import {
  CreateRoomError,
  CreateRoomResponse,
  EditRoomError,
  EditRoomRequest,
  EditRoomResponse,
  GetRoomError,
  GetRoomRequest,
  GetRoomResponse,
  RoomActionTypes,
} from './rooms.actions';
import { RoomQuery } from './rooms.selector';

@Injectable()
export class RoomEffects {
  @Effect() getRoom$ = this.actions$.pipe(
    ofType(RoomActionTypes.GetRoomRequest),
    mergeMap(() =>
      this.service.getRooms().pipe(
        map((x) => new GetRoomResponse(x)),
        catchError(async () => new GetRoomError())
      )
    )
  );

  @Effect() createRoom$ = this.actions$.pipe(
    ofType(RoomActionTypes.CreateRoomRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.createRoom({ name: RoomQuery.getCreateForm(storeState) }).pipe(
        map(() => new CreateRoomResponse()),
        catchError(async () => new CreateRoomError())
      )
    )
  );
  @Effect() editRoom$ = this.actions$.pipe(
    ofType(RoomActionTypes.EditRoomRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service
        .editRoom({ id: (action as EditRoomRequest).payload, newName: RoomQuery.getEditForm(storeState) })
        .pipe(
          map(() => new EditRoomResponse()),
          catchError(async () => new EditRoomError())
        )
    )
  );
  @Effect() refreshList$ = this.actions$.pipe(
    ofType(RoomActionTypes.EditRoomResponse, RoomActionTypes.CreateRoomResponse),
    map(() => new GetRoomRequest())
  );

  constructor(private service: RoomService, private actions$: Actions, private store: Store<{}>) {}
}
