import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ROOM_FEATURE_KEY, RoomState } from './rooms.reducer';

const getRoomState = createFeatureSelector<RoomState>(ROOM_FEATURE_KEY);

const getRoom = createSelector(getRoomState, (state: RoomState) =>
  state.filterForm.length > 0 ? state.list.filter((x) => x.name.includes(state.filterForm)) : state.list
);

const getRoomRequesting = createSelector(getRoomState, (state: RoomState) => state.isRequesting);

const getCreateForm = createSelector(getRoomState, (state: RoomState) => state.createForm);
const getEditForm = createSelector(getRoomState, (state: RoomState) => state.editForm);

const getFilterForm = createSelector(getRoomState, (state: RoomState) => state.filterForm);

export const RoomQuery = {
  getRoomList: getRoom,
  getRoomRequesting,
  getCreateForm,
  getFilterForm,
  getEditForm,
};
