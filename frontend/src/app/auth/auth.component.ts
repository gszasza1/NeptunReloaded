import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { LoginFormResponse } from '../login/+state/login.acions';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.store.dispatch(new LoginFormResponse(localStorage.getItem('token')));
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.store.dispatch({ type: 'SET_ROOT_STATE' });
  }
}
