import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoginFormResponse } from '../login/+state/login.acions';
import { LoginFormQuery } from '../login/+state/login.selector';
import { UnsubscribeOnDestroyBaseComponent } from '../shared/UnSubOnDestroy';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  constructor(private store: Store, private router: Router, private title: Title) {
    super();
  }
  userType$: Observable<string>;
  title$: string;
  ngOnInit(): void {
    this.subscriptions.push(this.router.events.subscribe(() => (this.title$ = this.title.getTitle())));
    this.userType$ = this.store.pipe(select(LoginFormQuery.getRole));
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
    this.router.navigateByUrl('/login');
  }
}
