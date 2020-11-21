import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeEditExam, EditExamRequest } from '../+state/exam.actions';
import { ExamQuery } from '../+state/exam.selector';

@Component({
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.scss'],
})
export class EditExamComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  examName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<EditExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(ExamQuery.getEditForm))
        .subscribe((x) => this.examName.patchValue(x, { emitEvent: false })),
      this.examName.valueChanges.subscribe((x) => this.store.dispatch(new ChangeEditExam(x)))
    );
  }
  save() {
    if (this.examName.valid) {
      this.store.dispatch(new EditExamRequest(this.data.id));
      this.dialogRef.close();
    } else {
      this.examName.markAllAsTouched();
    }
  }
}
