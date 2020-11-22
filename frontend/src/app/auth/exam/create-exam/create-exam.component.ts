import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CreateExam } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeCreateExam, CreateExamRequest } from '../+state/exam.actions';
import { ExamQuery } from '../+state/exam.selector';

type CreateExamForm = Record<keyof CreateExam, FormControl>;
@Component({
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss'],
})
export class CreateExamComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  formControls: CreateExamForm = {
    courseId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
  };
  formGroup = new FormGroup(this.formControls);
  constructor(private store: Store, public dialogRef: MatDialogRef<CreateExamComponent>) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(ExamQuery.getCreateForm))
        .subscribe((x) => this.formGroup.patchValue(x, { emitEvent: false })),
      this.formGroup.valueChanges.subscribe((x) => this.store.dispatch(new ChangeCreateExam(x)))
    );
  }
  save() {
    if (this.formGroup.valid) {
      this.store.dispatch(new CreateExamRequest());
      this.dialogRef.close();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
