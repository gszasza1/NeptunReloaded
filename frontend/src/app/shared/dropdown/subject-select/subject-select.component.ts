import { Component, forwardRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SubjectSelect } from '../../backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from '../../UnSubOnDestroy';
import { SubjectSelectRequest } from './+state/Subject-select.actions';
import { SubjectSelectQuery } from './+state/subject-select.selector';

@Component({
  selector: 'app-subject-select',
  templateUrl: './subject-select.component.html',
  styleUrls: ['./subject-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubjectSelectComponent),
      multi: true,
    },
  ],
})
export class SubjectSelectComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit, ControlValueAccessor {
  constructor(private store: Store) {
    super();
  }
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }
  @ViewChild(MatSelect, { static: true })
  input: MatSelect;
  subjectList$: Observable<SubjectSelect[]>;
  @Input() disabled = false;
  ngOnInit() {
    this.store.dispatch(new SubjectSelectRequest());
    this.subjectList$ = this.store.pipe(select(SubjectSelectQuery.getSubjectSelectList));
    this.subscriptions.push(this.input.valueChange.subscribe((x) => this.onChange(x)));
  }
  onChange = (subjectId: number) => {};
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
