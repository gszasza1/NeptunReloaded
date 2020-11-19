import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { ProfilService } from '../profil.service';
import {
  PasswordChangeError,
  PasswordChangeResponse,
  ProfilActionTypes,
  UserNameChangeError,
  UserNameChangeResponse,
  UserProfilError,
  UserProfilResponse,
} from './profil.actions';
import { ProfilQuery } from './profil.selector';

@Injectable()
export class ProfilEffects {
  @Effect() ChangeUsername$ = this.actions$.pipe(
    ofType(ProfilActionTypes.UserNameChangeRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.changeUserName(ProfilQuery.getUserName(storeState)).pipe(
        map((x) => new UserNameChangeResponse()),
        catchError(async () => new UserNameChangeError())
      )
    )
  );
  @Effect() changePass$ = this.actions$.pipe(
    ofType(ProfilActionTypes.PasswordChangeRequest),
    withLatestFrom(this.store),
    mergeMap(([action, storeState]) =>
      this.service.changePass(ProfilQuery.getPassword(storeState)).pipe(
        map((x) => new PasswordChangeResponse()),
        catchError(async () => new PasswordChangeError())
      )
    )
  );

  @Effect() getUserProfile$ = this.actions$.pipe(
    ofType(ProfilActionTypes.UserProfilRequest),

    mergeMap(() =>
      this.service.getUser().pipe(
        map((x) => new UserProfilResponse(x)),
        catchError(async () => new UserProfilError())
      )
    )
  );

  constructor(private service: ProfilService, private store: Store<{}>, private actions$: Actions) {}
}
