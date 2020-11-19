import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/app/shared/backend.interface';

import { UnsubscribeOnDestroyBaseComponent } from '../shared/UnSubOnDestroy';
import { ChangeRegisterForm, RegisterFormRequest } from './+state/register.acions';
import { registerFormQuery } from './+state/register.selector';

type RegisterForm = Record<keyof RegisterUser, FormControl>;

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  registerForm: RegisterForm = {
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    neptun: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  };
  isRequesting$: Observable<boolean>;
  formGroup = new FormGroup(this.registerForm);

  constructor(private store: Store) {
    super();
  }
  ngOnInit(): void {
    this.isRequesting$ = this.store.pipe(select(registerFormQuery.getRegisterFormRequesting));
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe((x) => this.store.dispatch(new ChangeRegisterForm(x))),
      this.store
        .pipe(select(registerFormQuery.getRegisterForm))
        .subscribe((x) => this.formGroup.patchValue(x, { emitEvent: false }))
    );
  }
  registerUser() {
    if (this.formGroup.valid) {
      this.store.dispatch(new RegisterFormRequest());
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
