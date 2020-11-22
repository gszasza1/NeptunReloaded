import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MinimalUser } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeFilterUser, ChangeRoleRequest, GetUserRequest } from './+state/users.actions';
import { UserQuery } from './+state/users.selector';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  UserList$: Observable<MinimalUser[]>;
  constructor(private store: Store, public dialog: MatDialog) {
    super();
  }

  filter = new FormControl('');
  displayedColumns = ['id', 'username', 'operations'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetUserRequest());

    this.UserList$ = this.store.pipe(select(UserQuery.getUserList));

    this.isRequesting$ = this.store.pipe(select(UserQuery.getUserRequesting));
    this.subscriptions.push(
      this.filter.valueChanges.subscribe((x) => this.store.dispatch(new ChangeFilterUser(x))),
      this.store.pipe(select(UserQuery.getFilterForm)).subscribe((x) => this.filter.patchValue(x, { emitEvent: false }))
    );
  }
  roleChange(newRole: string, userId: number) {
    this.store.dispatch(new ChangeRoleRequest({ newRole, userId }));
  }
}
