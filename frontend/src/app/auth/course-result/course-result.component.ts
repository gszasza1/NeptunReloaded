import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseResultsExtended } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeCourseResultFilter, GetCourseResultRequest } from './+state/course-result.actions';
import { CourseResultQuery } from './+state/course-result.selector';
import { CourseCourseResultComponent } from './create-course-result/create-course-result.component';

@Component({
  templateUrl: './course-result.component.html',
  styleUrls: ['./course-result.component.scss'],
})
export class CourseResultComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  CourseResultList$: Observable<CourseResultsExtended[]>;
  constructor(private store: Store, public dialog: MatDialog) {
    super();
  }

  filter = new FormControl('');
  displayedColumns = ['id', 'score', 'neptun', 'courseName'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetCourseResultRequest());

    this.CourseResultList$ = this.store.pipe(select(CourseResultQuery.getCourseResultList));

    this.isRequesting$ = this.store.pipe(select(CourseResultQuery.getCourseResultRequesting));
    this.subscriptions.push(
      this.filter.valueChanges.subscribe((x) => this.store.dispatch(new ChangeCourseResultFilter(x))),
      this.store
        .pipe(select(CourseResultQuery.getFilterForm))
        .subscribe((x) => this.filter.patchValue(x, { emitEvent: false }))
    );
  }
  newCourseResult() {
    this.dialog.open(CourseCourseResultComponent);
  }
}
