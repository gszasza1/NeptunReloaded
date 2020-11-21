import { Component, forwardRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CourseSelect } from '../../backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from '../../UnSubOnDestroy';
import { CourseSelectRequest } from './+state/course-select.actions';
import { CourseSelectQuery } from './+state/course-select.selector';

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseSelectComponent),
      multi: true,
    },
  ],
})
export class CourseSelectComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit, ControlValueAccessor {
  constructor(private store: Store) {
    super();
  }
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }
  @ViewChild(MatSelect, { static: true })
  input: MatSelect;
  courseList$: Observable<CourseSelect[]>;
  @Input() disabled = false;
  ngOnInit() {
    this.store.dispatch(new CourseSelectRequest());
    this.courseList$ = this.store.pipe(select(CourseSelectQuery.getCourseSelectList));
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
