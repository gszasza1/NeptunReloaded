import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { Action, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { filter, map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormEffects } from './login/+state/login.effects';
import { LOGINFORM_FEATURE_KEY, loginFormInitialState, LoginFormReducer } from './login/+state/login.reducer';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterFormEffects } from './register/+state/register.effects';
import { REGISTERFORM_FEATURE_KEY, registerFormInitialState, RegisterFormReducer } from './register/+state/register.reducer';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { AuthDirectiveModule } from './shared/directive/auth-directive.module';
import { DefaultSendInterceptor } from './shared/interceptors/default-send.interceptor';
import { SnackbarInterceptor } from './shared/interceptors/snackbar.interceptor';
import { SuccessInterceptor } from './shared/interceptors/success.interceptor';
import { UnAuthInterceptor } from './shared/interceptors/unauth.interceptor';
import { SharedUiModule } from './shared/shared-ui/shared-ui.module';

// tslint:disable-next-line: no-any
export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  // tslint:disable-next-line: no-any
  return (state: any, action: any) => {
    if (action.type === 'SET_ROOT_STATE') {
      state = undefined;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<{}, Action>[] = [stateSetter];

@NgModule({
  declarations: [AppComponent, RegisterComponent, RegisterComponent, LoginComponent, MainPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers: [...metaReducers],
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    EffectsModule.forFeature([RegisterFormEffects]),
    StoreModule.forFeature(REGISTERFORM_FEATURE_KEY, RegisterFormReducer, {
      initialState: registerFormInitialState,
    }),
    EffectsModule.forFeature([LoginFormEffects]),
    StoreModule.forFeature(LOGINFORM_FEATURE_KEY, LoginFormReducer, {
      initialState: loginFormInitialState,
    }),
    // Connects RouterModule with StoreModule, uses MinimalRouterStateSerializer by default
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    SharedUiModule,
    AuthDirectiveModule,
  ],
  providers: [
    RegisterService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: UnAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultSendInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SuccessInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private title: Title) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data.title) {
              return child.snapshot.data.title;
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data) => {
        this.title.setTitle(data ?? 'Neptun újratöltve');
      });
  }
}
