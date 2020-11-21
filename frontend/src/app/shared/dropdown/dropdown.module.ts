import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedUiModule } from '../shared-ui/shared-ui.module';
import { CourseSelectEffects } from './course-select/+state/course-select.effects';
import {
  COURSESELECT_FEATURE_KEY,
  CourseSelectInitialState,
  CourseSelectReducer,
} from './course-select/+state/course-select.reducer';
import { CourseSelectComponent } from './course-select/course-select.component';
import { DropdownService } from './dropdown.service';

@NgModule({
  declarations: [CourseSelectComponent],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CourseSelectEffects]),
    StoreModule.forFeature(COURSESELECT_FEATURE_KEY, CourseSelectReducer, {
      initialState: CourseSelectInitialState,
    }),
  ],
  exports: [CourseSelectComponent],
  providers: [DropdownService],
})
export class DropdownModule {}
