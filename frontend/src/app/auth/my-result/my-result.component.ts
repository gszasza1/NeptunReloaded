import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseResultsExtended } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { GetMyResultRequest } from './+state/my-result.actions';
import { MyResultsQuery } from './+state/my-result.selector';

@Component({
  templateUrl: './my-result.component.html',
  styleUrls: ['./my-result.component.scss'],
})
export class MyResultComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  CourseResultList$: Observable<CourseResultsExtended[]>;
  constructor(private store: Store, public dialog: MatDialog) {
    super();
  }

  filter = new FormControl('');
  displayedColumns = ['id', 'score', 'neptun', 'createdAt', 'courseName'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetMyResultRequest());
    this.CourseResultList$ = this.store.pipe(select(MyResultsQuery.getMyResultList));
    this.isRequesting$ = this.store.pipe(select(MyResultsQuery.getMyResultRequesting));
  }
}
