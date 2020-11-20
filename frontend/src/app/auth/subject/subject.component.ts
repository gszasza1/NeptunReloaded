import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { ChangeFilterSubject, GetSubjectRequest } from './+state/subject.actions';
import { SubjectQuery } from './+state/subject.selector';
import { CreateSubjectComponent } from './create-subject/create-subject.component';

@Component({
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  subjectList$: Observable<Subject[]>;
  constructor(private store: Store, public dialog: MatDialog) {
    super();
  }

  filter = new FormControl('');
  displayedColumns = ['id', 'name'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetSubjectRequest());

    this.subjectList$ = this.store.pipe(select(SubjectQuery.getSubjectList));

    this.isRequesting$ = this.store.pipe(select(SubjectQuery.getSubjectRequesting));
    this.subscriptions.push(
      this.filter.valueChanges.subscribe((x) => this.store.dispatch(new ChangeFilterSubject(x))),
      this.store
        .pipe(select(SubjectQuery.getFilterForm))
        .subscribe((x) => this.filter.patchValue(x, { emitEvent: false }))
    );
  }
  newSubject() {
    this.dialog.open(CreateSubjectComponent);
  }
}
