import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeCreateSubject, CreateSubjectRequest } from '../+state/subject.actions';
import { SubjectQuery } from '../+state/subject.selector';

@Component({
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
})
export class CreateSubjectComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  subjectName = new FormControl('', [Validators.required, Validators.minLength(6)]);
  constructor(private store: Store, public dialogRef: MatDialogRef<CreateSubjectComponent>) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(SubjectQuery.getCreateForm))
        .subscribe((x) => this.subjectName.patchValue(x, { emitEvent: false })),
      this.subjectName.valueChanges.subscribe((x) => this.store.dispatch(new ChangeCreateSubject(x)))
    );
  }
  save() {
    if (this.subjectName.valid) {
      this.store.dispatch(new CreateSubjectRequest());
      this.dialogRef.close();
    } else {
      this.subjectName.markAllAsTouched();
    }
  }
}
