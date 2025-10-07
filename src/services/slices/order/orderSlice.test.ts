import orderReducer, { fetchOrderByNumber, clearOrder } from './orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice reducer', () => {
  const initialState = {
    orderData: null as TOrder | null,
    orderRequest: false,
    orderError: null as string | null
  };

  it('должен ставить orderRequest = true при pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
    expect(state.orderData).toBeNull();
  });

  it('должен сохранять заказ и ставить orderRequest = false при fulfilled', () => {
    const mockOrder: TOrder = {
      _id: '123',
      number: 101,
      status: 'done',
      name: 'Тестовый бургер',
      ingredients: ['bun1', 'sauce1'],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    };

    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
    expect(state.orderError).toBeNull();
  });

  it('должен сохранять ошибку и ставить orderRequest = false при rejected', () => {
    const errorMessage = 'Ошибка получения заказа';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      payload: errorMessage
    };
    const state = orderReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(errorMessage);
    expect(state.orderData).toBeNull();
  });

  it('должен очищать заказ и ошибки при clearOrder', () => {
    const filledState = {
      orderData: {
        _id: '123',
        number: 101,
        status: 'done',
        name: 'Тестовый бургер',
        ingredients: ['bun1'],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      } as TOrder,
      orderRequest: true,
      orderError: 'Ошибка'
    };

    const action = clearOrder();
    const state = orderReducer(filledState, action);

    expect(state.orderData).toBeNull();
    expect(state.orderError).toBeNull();
    expect(state.orderRequest).toBe(false);
  });
});
