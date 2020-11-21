import { Component, forwardRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StudentForExamSelect } from '../../backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from '../../UnSubOnDestroy';
import { StudentForExamSelectRequest } from './+state/student-for-exam-select.actions';
import { StudentForExamSelectQuery } from './+state/student-for-exam-select.selector';

@Component({
  selector: 'app-student-for-exam-select',
  templateUrl: './student-for-exam-select.component.html',
  styleUrls: ['./student-for-exam-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StudentForExamSelectComponent),
      multi: true,
    },
  ],
})
export class StudentForExamSelectComponent
  extends UnsubscribeOnDestroyBaseComponent
  implements OnInit, ControlValueAccessor {
  constructor(private store: Store) {
    super();
  }
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }
  @ViewChild(MatSelect, { static: true })
  input: MatSelect;
  studentList$: Observable<StudentForExamSelect[]>;
  @Input() disabled = false;
  @Input() examId: number;
  ngOnInit() {
    if (this.examId) {
      this.store.dispatch(new StudentForExamSelectRequest(this.examId));
    } else {
      console.error('Nincs examId megadva');
    }
    this.studentList$ = this.store.pipe(select(StudentForExamSelectQuery.getStudentForExamSelectList));
    this.subscriptions.push(this.input.valueChange.subscribe((x) => this.onChange(x)));
  }
  onChange = (studentId: number) => {};
  onTouched = () => {};
  writeValue(obj: number): void {
    this.input.writeValue(obj);
  }
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
