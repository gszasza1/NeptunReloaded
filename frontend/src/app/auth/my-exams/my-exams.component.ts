import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exams } from 'src/app/shared/backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from 'src/app/shared/UnSubOnDestroy';

import { GetMyExamsRequest } from './+state/my-exams.actions';
import { MyExamsQuery } from './+state/my-exams.selector';

@Component({
  selector: 'app-my-exams',
  templateUrl: './my-exams.component.html',
  styleUrls: ['./my-exams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyExamsComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit {
  ExamsList$: Observable<Exams[]>;
  constructor(private store: Store) {
    super();
  }

  displayedColumns = ['id', 'name'];
  isRequesting$: Observable<boolean>;
  ngOnInit(): void {
    this.store.dispatch(new GetMyExamsRequest());
    this.ExamsList$ = this.store.pipe(select(MyExamsQuery.getMyExamList));
    this.isRequesting$ = this.store.pipe(select(MyExamsQuery.getMyExamRequesting));
  }
}
