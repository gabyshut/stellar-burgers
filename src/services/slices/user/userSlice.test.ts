import userReducer, {
  loginUser,
  registerUser,
  logoutUser,
  fetchUser,
  updateUser
} from './userSlice';
import { TUser } from '@utils-types';

describe('userSlice reducer', () => {
  const initialState = {
    user: null as TUser | null,
    isAuthChecked: false,
    error: null as string | null
  };

  const mockUser: TUser = {
    email: 'test@test.com',
    name: 'Test User'
  };

  it('должен сохранять пользователя и isAuthChecked=true при loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять пользователя и isAuthChecked=true при registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен очищать пользователя и ставить isAuthChecked=true при logoutUser.fulfilled', () => {
    const filledState = {
      user: mockUser,
      isAuthChecked: false,
      error: null
    };

    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(filledState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен сохранять пользователя и ставить isAuthChecked=true при fetchUser.fulfilled', () => {
    const action = { type: fetchUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен очищать пользователя и ставить isAuthChecked=true при fetchUser.rejected', () => {
    const filledState = {
      user: mockUser,
      isAuthChecked: false,
      error: null
    };

    const action = { type: fetchUser.rejected.type };
    const state = userReducer(filledState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен обновлять данные пользователя при updateUser.fulfilled', () => {
    const updatedUser: TUser = { email: 'new@test.com', name: 'New Name' };

    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = userReducer({ ...initialState, user: mockUser }, action);

    expect(state.user).toEqual(updatedUser);
    expect(state.isAuthChecked).toBe(false); // updateUser не трогает этот флаг
  });
});
