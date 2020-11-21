import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseList } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeFilterCourse, GetCourseRequest } from './+state/course.actions';
import { CourseQuery } from './+state/course.selector';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

@Component({
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  CourseList$: Observable<CourseList[]>;
  constructor(private store: Store, public dialog: MatDialog) {
    super();
  }

  filter = new FormControl('');
  displayedColumns = ['id', 'name', 'operations'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetCourseRequest());

    this.CourseList$ = this.store.pipe(select(CourseQuery.getCourseList));

    this.isRequesting$ = this.store.pipe(select(CourseQuery.getCourseRequesting));
    this.subscriptions.push(
      this.filter.valueChanges.subscribe((x) => this.store.dispatch(new ChangeFilterCourse(x))),
      this.store
        .pipe(select(CourseQuery.getFilterForm))
        .subscribe((x) => this.filter.patchValue(x, { emitEvent: false }))
    );
  }
  newCourse() {
    this.dialog.open(CreateCourseComponent);
  }
  editCourse(Course: { id: number; name: string }) {
    this.dialog.open(EditCourseComponent, { data: { ...Course } });
  }
}
