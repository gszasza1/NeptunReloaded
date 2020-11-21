import { Component, forwardRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ExamSelect } from '../../backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from '../../UnSubOnDestroy';
import { ExamSelectRequest } from './+state/exam-select.actions';
import { ExamSelectQuery } from './+state/exam-select.selector';

@Component({
  selector: 'app-exam-select',
  templateUrl: './exam-select.component.html',
  styleUrls: ['./exam-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExamSelectComponent),
      multi: true,
    },
  ],
})
export class ExamSelectComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit, ControlValueAccessor {
  constructor(private store: Store) {
    super();
  }
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }
  @ViewChild(MatSelect, { static: true })
  input: MatSelect;
  courseList$: Observable<ExamSelect[]>;
  @Input() disabled = false;
  ngOnInit() {
    this.store.dispatch(new ExamSelectRequest());
    this.courseList$ = this.store.pipe(select(ExamSelectQuery.getExamSelectList));
    this.subscriptions.push(this.input.valueChange.subscribe((x) => this.onChange(x)));
  }
  onChange = (courseId: number) => {};
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
