import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PROFIL_FEATURE_KEY, ProfilState } from './profil.reducer';

const getProfilState = createFeatureSelector<ProfilState>(PROFIL_FEATURE_KEY);
const getProfil = createSelector(getProfilState, (state: ProfilState) => state.profil);
const getProfilRequesting = createSelector(getProfilState, (state: ProfilState) => state.isRequesting);
const getUserName = createSelector(getProfilState, (state: ProfilState) => state.username);
const getPassword = createSelector(getProfilState, (state: ProfilState) => state.password);

export const ProfilQuery = {
  getProfil,
  getProfilRequesting,
  getUserName,
  getPassword,
};
