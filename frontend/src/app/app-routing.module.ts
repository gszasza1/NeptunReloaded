import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Regisztráció',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Bejelentkezés',
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'register',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
