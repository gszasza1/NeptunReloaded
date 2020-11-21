import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CreateCourse } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeCreateCourse, CreateCourseRequest } from '../+state/course.actions';
import { CourseQuery } from '../+state/course.selector';

type CreateCourseForm = Record<keyof CreateCourse, FormControl>;
@Component({
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  formControls: CreateCourseForm = {
    roomId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    subjectId: new FormControl(null, [Validators.required]),
  };
  formGroup = new FormGroup(this.formControls);

  constructor(private store: Store, public dialogRef: MatDialogRef<CreateCourseComponent>) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(CourseQuery.getCreateForm))
        .subscribe((x) => this.formGroup.patchValue(x, { emitEvent: false })),
      this.formGroup.valueChanges.subscribe((x) => this.store.dispatch(new ChangeCreateCourse(x)))
    );
  }
  save() {
    if (this.formGroup.valid) {
      this.store.dispatch(new CreateCourseRequest());
      this.dialogRef.close();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
