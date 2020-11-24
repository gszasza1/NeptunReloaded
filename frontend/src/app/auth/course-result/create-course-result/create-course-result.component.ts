import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CreateCourseResult } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeCreateCourseResult, CreateCourseResultRequest } from '../+state/course-result.actions';
import { ExamQuery } from '../../exam/+state/exam.selector';

type CreateCourseResultForm = Record<keyof CreateCourseResult, FormControl>;
@Component({
  templateUrl: './create-course-result.component.html',
  styleUrls: ['./create-course-result.component.scss'],
})
export class CourseCourseResultComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  formControls: CreateCourseResultForm = {
    userId: new FormControl(null, [Validators.required]),
    examId: new FormControl(null, [Validators.required]),
    score: new FormControl(null, [Validators.min(0), Validators.max(100)]),
  };
  formGroup = new FormGroup(this.formControls);
  constructor(private store: Store, public dialogRef: MatDialogRef<CourseCourseResultComponent>) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(ExamQuery.getCreateForm))
        .subscribe((x) => this.formGroup.patchValue(x, { emitEvent: false })),
      this.formGroup.valueChanges.subscribe((x) => this.store.dispatch(new ChangeCreateCourseResult(x)))
    );
  }
  save() {
    if (this.formGroup.valid) {
      this.store.dispatch(new CreateCourseResultRequest());
      this.dialogRef.close();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
