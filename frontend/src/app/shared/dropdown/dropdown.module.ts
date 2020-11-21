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
import { ExamSelectEffects } from './exam-select/+state/exam-select.effects';
import { EXAMSELECT_FEATURE_KEY, ExamSelectInitialState, ExamSelectReducer } from './exam-select/+state/exam-select.reducer';
import { ExamSelectComponent } from './exam-select/exam-select.component';
import { RoomSelectComponent } from './room-select/room-select.component';
import {
  STUDENT_FOR_EXAM_SELECT_FEATURE_KEY,
  StudentForExamSelectInitialState,
  StudentForExamSelectReducer,
} from './student-for-exam-select/+state/student-for-exam-select.reducer';
import { StudentForExamSelectEffects } from './student-for-exam-select/+state/student-for-exam-selecteffects';
import { StudentForExamSelectComponent } from './student-for-exam-select/student-for-exam-selectcomponent';

@NgModule({
  declarations: [CourseSelectComponent, ExamSelectComponent, StudentForExamSelectComponent, RoomSelectComponent],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CourseSelectEffects]),
    StoreModule.forFeature(COURSESELECT_FEATURE_KEY, CourseSelectReducer, {
      initialState: CourseSelectInitialState,
    }),
    EffectsModule.forFeature([ExamSelectEffects]),
    StoreModule.forFeature(EXAMSELECT_FEATURE_KEY, ExamSelectReducer, {
      initialState: ExamSelectInitialState,
    }),
    EffectsModule.forFeature([StudentForExamSelectEffects]),
    StoreModule.forFeature(STUDENT_FOR_EXAM_SELECT_FEATURE_KEY, StudentForExamSelectReducer, {
      initialState: StudentForExamSelectInitialState,
    }),
  ],
  exports: [CourseSelectComponent, ExamSelectComponent, StudentForExamSelectComponent, RoomSelectComponent],
  providers: [DropdownService],
})
export class DropdownModule {}
