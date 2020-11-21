import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CreateExamResult } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeCreateExamResult, CreateExamResultRequest } from '../+state/exam-result.actions';
import { ExamQuery } from '../../exam/+state/exam.selector';

type CreateExamResultForm = Record<keyof CreateExamResult, FormControl>;
@Component({
  templateUrl: './create-exam-result.component.html',
  styleUrls: ['./create-exam-result.component.scss'],
})
export class CreateExamResultComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  formControls: CreateExamResultForm = {
    studentId: new FormControl(null, [Validators.required]),
    examId: new FormControl(null, [Validators.required]),
    score: new FormControl(null, [Validators.min(0), Validators.max(100)]),
  };
  formGroup = new FormGroup(this.formControls);
  constructor(private store: Store, public dialogRef: MatDialogRef<CreateExamResultComponent>) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(ExamQuery.getCreateForm))
        .subscribe((x) => this.formGroup.patchValue(x, { emitEvent: false })),
      this.formGroup.valueChanges.subscribe((x) => this.store.dispatch(new ChangeCreateExamResult(x)))
    );
  }
  save() {
    if (this.formGroup.valid) {
      this.store.dispatch(new CreateExamResultRequest());
      this.dialogRef.close();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
