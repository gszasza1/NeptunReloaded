import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeCreateCourse, CreateCourseRequest } from '../+state/course.actions';
import { CourseQuery } from '../+state/course.selector';

@Component({
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  CourseName = new FormControl('', [Validators.required, Validators.minLength(6)]);
  constructor(private store: Store, public dialogRef: MatDialogRef<CreateCourseComponent>) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(CourseQuery.getCreateForm))
        .subscribe((x) => this.CourseName.patchValue(x, { emitEvent: false })),
      this.CourseName.valueChanges.subscribe((x) => this.store.dispatch(new ChangeCreateCourse(x)))
    );
  }
  save() {
    if (this.CourseName.valid) {
      this.store.dispatch(new CreateCourseRequest());
      this.dialogRef.close();
    } else {
      this.CourseName.markAllAsTouched();
    }
  }
}
