import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exams } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeFilterExam, GetExamRequest } from './+state/exam.actions';
import { ExamQuery } from './+state/exam.selector';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';

@Component({
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  ExamsList$: Observable<Exams[]>;
  constructor(private store: Store, public dialog: MatDialog) {
    super();
  }

  filter = new FormControl('');
  displayedColumns = ['id', 'name', 'operations'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetExamRequest());
    this.ExamsList$ = this.store.pipe(select(ExamQuery.getExamList));
    this.isRequesting$ = this.store.pipe(select(ExamQuery.getExamRequesting));
    this.subscriptions.push(
      this.filter.valueChanges.subscribe((x) => this.store.dispatch(new ChangeFilterExam(x))),
      this.store.pipe(select(ExamQuery.getFilterForm)).subscribe((x) => this.filter.patchValue(x, { emitEvent: false }))
    );
  }
  newExams() {
    this.dialog.open(CreateExamComponent);
  }
  editExams(exam: { id: number; name: string }) {
    this.dialog.open(EditExamComponent, { data: { ...exam } });
  }
  joinExam(examId: number) {
    this.store.dispatch(new GetExamRequest());
  }
}
