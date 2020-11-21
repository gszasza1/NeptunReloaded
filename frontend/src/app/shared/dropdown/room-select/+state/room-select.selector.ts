import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ROOMSELECT_FEATURE_KEY, RoomSelectState } from './room-select.reducer';

const getRoomSelectState = createFeatureSelector<RoomSelectState>(ROOMSELECT_FEATURE_KEY);
const getRoomSelectList = createSelector(getRoomSelectState, (state: RoomSelectState) => state.list);
const getRoomSelectRequesting = createSelector(getRoomSelectState, (state: RoomSelectState) => state.isRequesting);

export const RoomSelectQuery = {
  getRoomSelectList,
  getRoomSelectRequesting,
};
