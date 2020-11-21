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
  courseName = new FormControl('', [Validators.required]);
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
        .subscribe((x) => this.courseName.patchValue(x, { emitEvent: false })),
      this.courseName.valueChanges.subscribe((x) => this.store.dispatch(new ChangeEditCourse(x)))
    );
  }
  save() {
    if (this.courseName.valid) {
      this.store.dispatch(new EditCourseRequest(this.data.id));
      this.dialogRef.close();
    } else {
      this.courseName.markAllAsTouched();
    }
  }
}
