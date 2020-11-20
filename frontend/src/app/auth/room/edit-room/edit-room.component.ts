import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeEditRoom, EditRoomRequest } from '../+state/rooms.actions';
import { RoomQuery } from '../+state/rooms.selector';

@Component({
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss'],
})
export class EditRoomComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  roomName = new FormControl('', [Validators.required]);
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<EditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(RoomQuery.getEditForm))
        .subscribe((x) => this.roomName.patchValue(x, { emitEvent: false })),
      this.roomName.valueChanges.subscribe((x) => this.store.dispatch(new ChangeEditRoom(x)))
    );
  }
  save() {
    if (this.roomName.valid) {
      this.store.dispatch(new EditRoomRequest(this.data.id));
      this.dialogRef.close();
    } else {
      this.roomName.markAllAsTouched();
    }
  }
}
