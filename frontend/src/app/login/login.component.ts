import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoginUser } from '../shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from '../shared/UnSubOnDestroy';
import { ChangeLoginForm, LoginFormRequest } from './+state/login.acions';
import { LoginFormQuery } from './+state/login.selector';

type LoginFormControls = Record<keyof LoginUser, FormControl>;

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  loginControls: LoginFormControls = {
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  };
  formGroup = new FormGroup(this.loginControls);
  isRequesting$: Observable<boolean> | undefined;
  constructor(private store: Store) {
    super();
  }
  ngOnInit(): void {
    this.isRequesting$ = this.store.pipe(select(LoginFormQuery.getLoginFormRequesting));
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe((x) => this.store.dispatch(new ChangeLoginForm(x))),
      this.store
        .pipe(select(LoginFormQuery.getLoginForm))
        .subscribe((x) => this.formGroup.patchValue(x, { emitEvent: false }))
    );
  }

  login(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(new LoginFormRequest());
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
