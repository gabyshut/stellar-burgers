import { combineReducers } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

describe('rootReducer', () => {
  it('должен инициализироваться без ошибок', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
  });

  it('содержит все необходимые слайсы', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toHaveProperty('constructorSlice');
    expect(state).toHaveProperty('feedSlice');
    expect(state).toHaveProperty('ingredientsSlice');
    expect(state).toHaveProperty('orderCreateSlice');
    expect(state).toHaveProperty('orderSlice');
    expect(state).toHaveProperty('ordersSlice');
    expect(state).toHaveProperty('userSlice');
  });
});
