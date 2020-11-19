import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangePassword, PasswordChangeRequest } from '../+state/profil.actions';
import { ProfilQuery } from '../+state/profil.selector';

@Component({
  templateUrl: './change-pass-dialog.component.html',
  styleUrls: ['./change-pass-dialog.component.scss'],
})
export class ChangePassDialogComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  constructor(private store: Store, public dialogRef: MatDialogRef<ChangePassDialogComponent>) {
    super();
  }

  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(ProfilQuery.getPassword))
        .subscribe((x) => this.password.patchValue(x, { emitEvent: false })),
      this.password.valueChanges.subscribe((x) => this.store.dispatch(new ChangePassword(x)))
    );
  }
  save() {
    if (this.password.valid) {
      this.store.dispatch(new PasswordChangeRequest());
      this.dialogRef.close();
    } else {
      this.password.markAllAsTouched();
    }
  }
}
