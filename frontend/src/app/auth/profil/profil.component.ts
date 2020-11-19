import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfil } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { UserProfilRequest } from './+state/profil.actions';
import { ProfilQuery } from './+state/profil.selector';
import { ChangePassDialogComponent } from './change-pass-dialog/change-pass-dialog.component';
import { ChangeUsernameDialogComponent } from './change-username-dialog/change-username-dialog.component';

@Component({
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  isRequesting$: Observable<boolean>;
  userProfile$: Observable<UserProfil>;
  constructor(private store: Store, public dialog: MatDialog) {
    super();
  }
  ngOnInit(): void {
    this.store.dispatch(new UserProfilRequest());
    this.isRequesting$ = this.store.pipe(select(ProfilQuery.getProfilRequesting));
    this.userProfile$ = this.store.pipe(select(ProfilQuery.getProfil));
  }

  changePass(): void {
    this.dialog.open(ChangePassDialogComponent);
  }
  changeuserName(): void {
    this.dialog.open(ChangeUsernameDialogComponent);
  }
}
