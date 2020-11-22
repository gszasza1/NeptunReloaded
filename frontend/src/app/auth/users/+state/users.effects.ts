import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { UserService } from '../users.service';
import {
  ChangeRoleError,
  ChangeRoleRequest,
  ChangeRoleResponse,
  GetUserError,
  GetUserRequest,
  GetUserResponse,
  UserActionTypes,
} from './users.actions';

@Injectable()
export class UserEffects {
  @Effect() GetUser$ = this.actions$.pipe(
    ofType(UserActionTypes.GetUserRequest),
    mergeMap(() =>
      this.service.getUsers().pipe(
        map((x) => new GetUserResponse(x)),
        catchError(async () => new GetUserError())
      )
    )
  );

  @Effect() ChangeRole$ = this.actions$.pipe(
    ofType(UserActionTypes.ChangeRoleRequest),
    mergeMap((action) =>
      this.service.changeUserRole((action as ChangeRoleRequest).payload).pipe(
        map(() => new ChangeRoleResponse()),
        catchError(async () => new ChangeRoleError())
      )
    )
  );
  @Effect() refreshList$ = this.actions$.pipe(
    ofType(UserActionTypes.ChangeRoleResponse),
    map(() => new GetUserRequest())
  );

  constructor(private service: UserService, private actions$: Actions, private store: Store<{}>) {}
}
