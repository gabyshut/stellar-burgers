import orderCreateReducer, { makeOrder, clearOrder } from './orderCreateSlice';
import { TOrder } from '@utils-types';

describe('orderCreateSlice reducer', () => {
  const initialState = {
    orderData: null as TOrder | null,
    orderRequest: false,
    orderError: null as string | null
  };

  it('должен ставить orderRequest = true и очищать ошибку при pending', () => {
    const action = { type: makeOrder.pending.type };
    const state = orderCreateReducer(initialState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
    expect(state.orderData).toBeNull();
  });

  it('должен сохранять заказ и ставить orderRequest = false при fulfilled', () => {
    const mockOrder: TOrder = {
      _id: '321',
      number: 202,
      status: 'pending',
      name: 'Тестовый заказ',
      ingredients: ['bun1', 'sauce1', 'main1'],
      createdAt: '2024-01-01T12:00:00.000Z',
      updatedAt: '2024-01-01T12:00:00.000Z'
    };

    const action = { type: makeOrder.fulfilled.type, payload: mockOrder };
    const state = orderCreateReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
    expect(state.orderError).toBeNull();
  });

  it('должен сохранять ошибку и ставить orderRequest = false при rejected', () => {
    const errorMessage = 'Ошибка оформления заказа';
    const action = { type: makeOrder.rejected.type, payload: errorMessage };
    const state = orderCreateReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(errorMessage);
    expect(state.orderData).toBeNull();
  });

  it('должен очищать заказ и ошибки при clearOrder', () => {
    const filledState = {
      orderData: {
        _id: '321',
        number: 202,
        status: 'done',
        name: 'Готовый заказ',
        ingredients: ['bun1'],
        createdAt: '2024-01-01T12:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z'
      } as TOrder,
      orderRequest: true,
      orderError: 'Ошибка оформления'
    };

    const action = clearOrder();
    const state = orderCreateReducer(filledState, action);

    expect(state.orderData).toBeNull();
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBeNull();
  });
});
