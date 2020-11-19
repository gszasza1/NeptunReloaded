import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeUserName, UserNameChangeRequest } from '../+state/profil.actions';
import { ProfilQuery } from '../+state/profil.selector';

@Component({
  templateUrl: './change-username-dialog.component.html',
  styleUrls: ['./change-username-dialog.component.scss'],
})
export class ChangeUsernameDialogComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  constructor(private store: Store, public dialogRef: MatDialogRef<ChangeUsernameDialogComponent>) {
    super();
  }

  username = new FormControl('', [Validators.required, Validators.minLength(6)]);
  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(ProfilQuery.getUserName))
        .subscribe((x) => this.username.patchValue(x, { emitEvent: false })),
      this.username.valueChanges.subscribe((x) => this.store.dispatch(new ChangeUserName(x)))
    );
  }
  save() {
    if (this.username.valid) {
      this.store.dispatch(new UserNameChangeRequest());
      this.dialogRef.close();
    } else {
      this.username.markAllAsTouched();
    }
  }
}
