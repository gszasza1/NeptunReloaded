import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { Action, ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormEffects } from './login/+state/login.effects';
import { LOGINFORM_FEATURE_KEY, loginFormInitialState, LoginFormReducer } from './login/+state/login.reducer';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { RegisterFormEffects } from './register/+state/register.effects';
import { REGISTERFORM_FEATURE_KEY, registerFormInitialState, RegisterFormReducer } from './register/+state/register.reducer';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { SharedUiModule } from './shared/shared-ui/shared-ui.module';

// tslint:disable-next-line: no-any
export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  // tslint:disable-next-line: no-any
  return (state: any, action: any) => {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<{}, Action>[] = [stateSetter];

@NgModule({
  declarations: [AppComponent, RegisterComponent, RegisterComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers,
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
  ],
  providers: [RegisterService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
