import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { CourseResultComponent } from './course-result/course-result.component';
import { CourseComponent } from './course/course.component';
import { ExamComponent } from './exam/exam.component';
import { MyExamsComponent } from './my-exams/my-exams.component';
import { MyResultComponent } from './my-result/my-result.component';
import { ProfilComponent } from './profil/profil.component';
import { RoomComponent } from './room/rooms.component';
import { SubjectComponent } from './subject/subject.component';
import { UsersComponent } from './users/users.component';

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
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Felhasználók',
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
        path: 'my-exams',
        component: MyExamsComponent,
        data: {
          title: 'Saját vizsgáim',
        },
      },
      {
        path: 'my-result',
        component: MyResultComponent,
        data: {
          title: 'Saját eredményeim',
        },
      },
      {
        path: 'course-result',
        component: CourseResultComponent,
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
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profil',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
