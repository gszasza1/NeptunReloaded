import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { CourseComponent } from './course/course.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ExamComponent } from './exam/exam.component';
import { ProfilComponent } from './profil/profil.component';
import { RoomComponent } from './room/rooms.component';
import { SubjectComponent } from './subject/subject.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'profil',
        component: ProfilComponent,
        data: {
          title: 'Fiók',
        },
      },
      {
        path: 'subject',
        component: SubjectComponent,
        data: {
          title: 'Tantárgy',
        },
      },
      {
        path: 'exam',
        component: ExamComponent,
        data: {
          title: 'Vizsga',
        },
      },
      {
        path: 'exam-result',
        component: ExamResultComponent,
        data: {
          title: 'Vizsgaeredmény',
        },
      },
      {
        path: 'room',
        component: RoomComponent,
        data: {
          title: 'Termek',
        },
      },
      {
        path: 'course',
        component: CourseComponent,
        data: {
          title: 'Kurzusok',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
