import { RootState } from '../store';

export const selectUser = (state: RootState) => state.userSlice.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.userSlice.isAuthChecked;
