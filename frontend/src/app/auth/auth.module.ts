import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedUiModule } from '../shared/shared-ui/shared-ui.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CourseComponent } from './course/course.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ExamComponent } from './exam/exam.component';
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

@NgModule({
  declarations: [
    AuthComponent,
    ProfilComponent,
    ChangePassDialogComponent,
    ChangeUsernameDialogComponent,
    ExamResultComponent,
    ExamComponent,
    SubjectComponent,
    CreateSubjectComponent,
    EditSubjectComponent,
    CourseComponent,
    RoomComponent,
    CourseDialogComponent,
    CreateRoomComponent,
    EditRoomComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedUiModule,
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
  ],
  providers: [ProfilService, SubjectService, CourseDialogService, RoomService],
})
export class AuthModule {}
