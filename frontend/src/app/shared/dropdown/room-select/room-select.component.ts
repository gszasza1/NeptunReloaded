import { Component, forwardRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RoomSelect } from '../../backend.interface';
import { UnsubscribeOnDestroyBaseComponent } from '../../UnSubOnDestroy';
import { RoomSelectRequest } from './+state/room-select.actions';
import { RoomSelectQuery } from './+state/room-select.selector';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoomSelectComponent),
      multi: true,
    },
  ],
})
export class RoomSelectComponent extends UnsubscribeOnDestroyBaseComponent implements OnInit, ControlValueAccessor {
  constructor(private store: Store) {
    super();
  }
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }
  @ViewChild(MatSelect, { static: true })
  input: MatSelect;
  RoomList$: Observable<RoomSelect[]>;
  @Input() disabled = false;
  ngOnInit() {
    this.store.dispatch(new RoomSelectRequest());
    this.RoomList$ = this.store.pipe(select(RoomSelectQuery.getRoomSelectList));
    this.subscriptions.push(this.input.valueChange.subscribe((x) => this.onChange(x)));
  }
  onChange = (RoomId: number) => {};
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
