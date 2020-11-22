import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USER_FEATURE_KEY, UserState } from './users.reducer';

const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

const getUser = createSelector(getUserState, (state: UserState) =>
  state.filterForm.length > 0 ? state.list.filter((x) => x.username.includes(state.filterForm)) : state.list
);

const getUserRequesting = createSelector(getUserState, (state: UserState) => state.isRequesting);

const getFilterForm = createSelector(getUserState, (state: UserState) => state.filterForm);

export const UserQuery = {
  getUserList: getUser,
  getUserRequesting,
  getFilterForm,
};
