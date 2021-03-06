import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LOGINFORM_FEATURE_KEY, LoginFormState } from './login.reducer';

const getLoginFormState = createFeatureSelector<LoginFormState>(LOGINFORM_FEATURE_KEY);
const getLoginForm = createSelector(getLoginFormState, (state: LoginFormState) => state.form);
const getLoginFormRequesting = createSelector(getLoginFormState, (state: LoginFormState) => state.isRequesting);
const getRole = createSelector(getLoginFormState, (state: LoginFormState) => state.decodedToken?.role);

export const LoginFormQuery = {
  getLoginForm,
  getLoginFormRequesting,
  getRole,
};
