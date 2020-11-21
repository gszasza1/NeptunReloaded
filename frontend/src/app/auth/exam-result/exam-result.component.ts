import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExamResults } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeExamResultFilter, GetExamResultRequest } from './+state/exam-result.actions';
import { ExamResultQuery } from './+state/exam-result.selector';
import { CreateExamResultComponent } from './create-exam-result/create-exam-result.component';

@Component({
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss'],
})
export class ExamResultComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  ExamResultList$: Observable<ExamResults[]>;
  constructor(private store: Store, public dialog: MatDialog) {
    super();
  }

  filter = new FormControl('');
  displayedColumns = ['id', 'score', 'neptun', 'examName'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetExamResultRequest());

    this.ExamResultList$ = this.store.pipe(select(ExamResultQuery.getExamResultList));

    this.isRequesting$ = this.store.pipe(select(ExamResultQuery.getExamResultRequesting));
    this.subscriptions.push(
      this.filter.valueChanges.subscribe((x) => this.store.dispatch(new ChangeExamResultFilter(x))),
      this.store
        .pipe(select(ExamResultQuery.getFilterForm))
        .subscribe((x) => this.filter.patchValue(x, { emitEvent: false }))
    );
  }
  newExamResult() {
    this.dialog.open(CreateExamResultComponent);
  }
}
