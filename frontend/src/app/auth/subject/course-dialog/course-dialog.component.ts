import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoursesPopUp } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import {
  ChangeFilterSubjectCourse,
  GetSubjectCourseRequest,
  JoinSubjectCourseRequest,
} from './+state/course-dialog.actions';
import { SubjectCourseQuery } from './+state/course-dialog.selector';

@Component({
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CourseDialogComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }) {
    super();
  }
  courseList$: Observable<CoursesPopUp[]>;
  expandedElement: CoursesPopUp | null;
  filter = new FormControl('');
  displayedColumns = ['id', 'name', 'operations'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetSubjectCourseRequest(this.data.id));

    this.courseList$ = this.store.pipe(select(SubjectCourseQuery.getSubjectCourselist));

    this.isRequesting$ = this.store.pipe(select(SubjectCourseQuery.getSubjectCourseRequesting));
    this.subscriptions.push(
      this.filter.valueChanges.subscribe((x) => this.store.dispatch(new ChangeFilterSubjectCourse(x))),
      this.store
        .pipe(select(SubjectCourseQuery.getFilterForm))
        .subscribe((x) => this.filter.patchValue(x, { emitEvent: false }))
    );
  }

  joinCourse(courseId: number) {
    this.store.dispatch(new JoinSubjectCourseRequest(courseId));
  }
}
