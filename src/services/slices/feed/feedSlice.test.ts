import feedReducer, { fetchFeed, initialState } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice reducer', () => {
  it('должен ставить isLoading = true и очищать ошибку при pending', () => {
    const action = fetchFeed.pending('', undefined);
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные и ставить isLoading = false при fulfilled', () => {
    const payload = {
      success: true,
      orders: [{ _id: '1', name: 'Test order', status: 'done' } as TOrder],
      total: 10,
      totalToday: 5
    };
    const action = fetchFeed.fulfilled(payload, '', undefined);
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
  });

  it('должен сохранять ошибку и ставить isLoading = false при rejected', () => {
    const errorMessage = 'Ошибка загрузки фида';
    const action = fetchFeed.rejected(null, '', undefined, errorMessage);
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
