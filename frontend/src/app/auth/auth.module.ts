import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthDirectiveModule } from '../shared/directive/auth-directive.module';
import { DropdownModule } from '../shared/dropdown/dropdown.module';
import { SharedUiModule } from '../shared/shared-ui/shared-ui.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CourseResultEffects } from './course-result/+state/course-result.effects';
import {
  CourseResult_FEATURE_KEY,
  CourseResultInitialState,
  CourseResultReducer,
} from './course-result/+state/course-result.reducer';
import { CourseResultComponent } from './course-result/course-result.component';
import { CourseCourseResultComponent } from './course-result/create-course-result/create-course-result.component';
import { CourseEffects } from './course/+state/course.effects';
import { COURSE_FEATURE_KEY, CourseInitialState, CourseReducer } from './course/+state/course.reducer';
import { CourseComponent } from './course/course.component';
import { CourseService } from './course/course.service';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { EditCourseComponent } from './course/edit-course/edit-course.component';
import { ExamsEffects } from './exam/+state/exam.effects';
import { EXAM_FEATURE_KEY, ExamsInitialState, ExamsReducer } from './exam/+state/exam.reducer';
import { CreateExamComponent } from './exam/create-exam/create-exam.component';
import { EditExamComponent } from './exam/edit-exam/edit-exam.component';
import { ExamComponent } from './exam/exam.component';
import { ExamService } from './exam/exam.service';
import { ProfilEffects } from './profil/+state/profil.effects';
import { PROFIL_FEATURE_KEY, ProfilInitialState, ProfilReducer } from './profil/+state/profil.reducer';
import { ChangePassDialogComponent } from './profil/change-pass-dialog/change-pass-dialog.component';
import { ChangeUsernameDialogComponent } from './profil/change-username-dialog/change-username-dialog.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilService } from './profil/profil.service';
import { RoomEffects } from './room/+state/rooms.effects';
import { ROOM_FEATURE_KEY, RoomInitialState, RoomReducer } from './room/+state/rooms.reducer';
import { CreateRoomComponent } from './room/create-room/create-room.component';
import { EditRoomComponent } from './room/edit-room/edit-room.component';
import { RoomComponent } from './room/rooms.component';
import { RoomService } from './room/rooms.service';
import { SubjectEffects } from './subject/+state/subject.effects';
import { SUBJECT_FEATURE_KEY, SubjectInitialState, SubjectReducer } from './subject/+state/subject.reducer';
import { SubjectCourseEffects } from './subject/course-dialog/+state/course-dialog.effects';
import {
  SUBJECTCOURSE_FEATURE_KEY,
  SubjectCourseInitialState,
  SubjectCourseReducer,
} from './subject/course-dialog/+state/course-dialog.reducer';
import { CourseDialogComponent } from './subject/course-dialog/course-dialog.component';
import { CourseDialogService } from './subject/course-dialog/course-dialog.service';
import { CreateSubjectComponent } from './subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './subject/edit-subject/edit-subject.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectService } from './subject/subject.service';
import { UserEffects } from './users/+state/users.effects';
import { USER_FEATURE_KEY, UserInitialState, UserReducer } from './users/+state/users.reducer';
import { UsersComponent } from './users/users.component';
import { UserService } from './users/users.service';

@NgModule({
  declarations: [
    EditCourseComponent,
    AuthComponent,
    ProfilComponent,
    ChangePassDialogComponent,
    ChangeUsernameDialogComponent,
    CourseResultComponent,
    ExamComponent,
    SubjectComponent,
    CreateSubjectComponent,
    EditSubjectComponent,
    CourseComponent,
    RoomComponent,
    CourseDialogComponent,
    CreateRoomComponent,
    EditRoomComponent,
    CreateExamComponent,
    EditExamComponent,
    CourseCourseResultComponent,
    CreateCourseComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedUiModule,
    DropdownModule,
    AuthDirectiveModule,
    EffectsModule.forFeature([ProfilEffects]),
    StoreModule.forFeature(PROFIL_FEATURE_KEY, ProfilReducer, {
      initialState: ProfilInitialState,
    }),
    EffectsModule.forFeature([SubjectEffects]),
    StoreModule.forFeature(SUBJECT_FEATURE_KEY, SubjectReducer, {
      initialState: SubjectInitialState,
    }),
    EffectsModule.forFeature([SubjectCourseEffects]),
    StoreModule.forFeature(SUBJECTCOURSE_FEATURE_KEY, SubjectCourseReducer, {
      initialState: SubjectCourseInitialState,
    }),
    EffectsModule.forFeature([RoomEffects]),
    StoreModule.forFeature(ROOM_FEATURE_KEY, RoomReducer, {
      initialState: RoomInitialState,
    }),
    EffectsModule.forFeature([ExamsEffects]),
    StoreModule.forFeature(EXAM_FEATURE_KEY, ExamsReducer, {
      initialState: ExamsInitialState,
    }),
    EffectsModule.forFeature([CourseEffects]),
    StoreModule.forFeature(COURSE_FEATURE_KEY, CourseReducer, {
      initialState: CourseInitialState,
    }),
    EffectsModule.forFeature([CourseResultEffects]),
    StoreModule.forFeature(CourseResult_FEATURE_KEY, CourseResultReducer, {
      initialState: CourseResultInitialState,
    }),
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(USER_FEATURE_KEY, UserReducer, {
      initialState: UserInitialState,
    }),
  ],
  providers: [ProfilService, SubjectService, CourseDialogService, RoomService, ExamService, CourseService, UserService],
})
export class AuthModule {}
