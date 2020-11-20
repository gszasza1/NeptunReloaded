import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeCreateRoom, CreateRoomRequest } from '../+state/rooms.actions';
import { RoomQuery } from '../+state/rooms.selector';

@Component({
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  roomName = new FormControl('', [Validators.required]);
  constructor(private store: Store, public dialogRef: MatDialogRef<CreateRoomComponent>) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(RoomQuery.getCreateForm))
        .subscribe((x) => this.roomName.patchValue(x, { emitEvent: false })),
      this.roomName.valueChanges.subscribe((x) => this.store.dispatch(new ChangeCreateRoom(x)))
    );
  }
  save() {
    if (this.roomName.valid) {
      this.store.dispatch(new CreateRoomRequest());
      this.dialogRef.close();
    } else {
      this.roomName.markAllAsTouched();
    }
  }
}
