import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeEditCourse, EditCourseRequest } from '../+state/course.actions';
import { CourseQuery } from '../+state/course.selector';

@Component({
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  CourseName = new FormControl('', [Validators.required, Validators.minLength(6)]);
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<EditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(CourseQuery.getEditForm))
        .subscribe((x) => this.CourseName.patchValue(x, { emitEvent: false })),
      this.CourseName.valueChanges.subscribe((x) => this.store.dispatch(new ChangeEditCourse(x)))
    );
  }
  save() {
    if (this.CourseName.valid) {
      this.store.dispatch(new EditCourseRequest(this.data.id));
      this.dialogRef.close();
    } else {
      this.CourseName.markAllAsTouched();
    }
  }
}
