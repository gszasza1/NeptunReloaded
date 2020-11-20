import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Room } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeFilterRoom, GetRoomRequest } from './+state/rooms.actions';
import { RoomQuery } from './+state/rooms.selector';
import { CreateRoomComponent } from './create-room/create-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';

@Component({
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  RoomList$: Observable<Room[]>;
  constructor(private store: Store, public dialog: MatDialog) {
    super();
  }

  filter = new FormControl('');
  displayedColumns = ['id', 'name', 'operations'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetRoomRequest());

    this.RoomList$ = this.store.pipe(select(RoomQuery.getRoomList));

    this.isRequesting$ = this.store.pipe(select(RoomQuery.getRoomRequesting));
    this.subscriptions.push(
      this.filter.valueChanges.subscribe((x) => this.store.dispatch(new ChangeFilterRoom(x))),
      this.store.pipe(select(RoomQuery.getFilterForm)).subscribe((x) => this.filter.patchValue(x, { emitEvent: false }))
    );
  }
  newRoom() {
    this.dialog.open(CreateRoomComponent);
  }
  editRoom(room: { id: number; name: string }) {
    this.dialog.open(EditRoomComponent, { data: { ...room } });
  }
}
