import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnAuthGuard } from './shared/guards/un-auth.guard';

const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('token');
    jwt_decode(token);
    return true;
  } catch {
    return false;
  }
};
const routes: Routes = [
  {
    path: 'register',
    canActivate: [UnAuthGuard],
    canActivateChild: [UnAuthGuard],
    component: RegisterComponent,
    data: {
      title: 'Regisztráció',
    },
  },
  {
    path: 'login',
    canActivate: [UnAuthGuard],
    canActivateChild: [UnAuthGuard],
    component: LoginComponent,
    data: {
      title: 'Bejelentkezés',
    },
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: isAuthenticated() ? 'auth' : 'register',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
