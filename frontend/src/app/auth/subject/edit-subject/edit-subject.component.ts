import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeEditSubject, EditSubjectRequest } from '../+state/subject.actions';
import { SubjectQuery } from '../+state/subject.selector';

@Component({
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.scss'],
})
export class EditSubjectComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  subjectName = new FormControl('', [Validators.required, Validators.minLength(6)]);
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<EditSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(SubjectQuery.getCreateForm))
        .subscribe((x) => this.subjectName.patchValue(x, { emitEvent: false })),
      this.subjectName.valueChanges.subscribe((x) => this.store.dispatch(new ChangeEditSubject(x)))
    );
  }
  save() {
    if (this.subjectName.valid) {
      this.store.dispatch(new EditSubjectRequest(this.data.id));
      this.dialogRef.close();
    } else {
      this.subjectName.markAllAsTouched();
    }
  }
}
