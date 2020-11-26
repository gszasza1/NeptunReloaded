import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MY_Result_FEATURE_KEY, MyResultState } from './my-result.reducer';

const getMyResultState = createFeatureSelector<MyResultState>(MY_Result_FEATURE_KEY);

const getMyResultList = createSelector(getMyResultState, (state: MyResultState) => state.list);

const getMyResultRequesting = createSelector(getMyResultState, (state: MyResultState) => state.isRequesting);

export const MyResultsQuery = {
  getMyResultList,
  getMyResultRequesting,
};
