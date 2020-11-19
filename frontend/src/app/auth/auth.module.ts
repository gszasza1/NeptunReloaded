import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedUiModule } from '../shared/shared-ui/shared-ui.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ProfilEffects } from './profil/+state/profil.effects';
import { PROFIL_FEATURE_KEY, ProfilInitialState, ProfilReducer } from './profil/+state/profil.reducer';
import { ChangePassDialogComponent } from './profil/change-pass-dialog/change-pass-dialog.component';
import { ChangeUsernameDialogComponent } from './profil/change-username-dialog/change-username-dialog.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilService } from './profil/profil.service';

@NgModule({
  declarations: [AuthComponent, ProfilComponent, ChangePassDialogComponent, ChangeUsernameDialogComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedUiModule,
    EffectsModule.forFeature([ProfilEffects]),
    StoreModule.forFeature(PROFIL_FEATURE_KEY, ProfilReducer, {
      initialState: ProfilInitialState,
    }),
  ],
  providers: [ProfilService],
})
export class AuthModule {}
