import ordersReducer, { fetchUserOrders, clearOrders } from './ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice reducer', () => {
  const initialState = {
    orders: [] as TOrder[],
    isLoading: false,
    error: null as string | null
  };

  it('должен ставить isLoading = true и очищать ошибку при pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = ordersReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
  });

  it('должен сохранять заказы и ставить isLoading = false при fulfilled', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '1',
        number: 101,
        status: 'done',
        name: 'Заказ 1',
        ingredients: ['bun1', 'sauce1'],
        createdAt: '2024-01-01T12:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z'
      },
      {
        _id: '2',
        number: 102,
        status: 'pending',
        name: 'Заказ 2',
        ingredients: ['bun2', 'main1'],
        createdAt: '2024-01-02T12:00:00.000Z',
        updatedAt: '2024-01-02T12:00:00.000Z'
      }
    ];

    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = ordersReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку и ставить isLoading = false при rejected', () => {
    const errorMessage = 'Ошибка получения заказов';
    const action = {
      type: fetchUserOrders.rejected.type,
      payload: errorMessage
    };
    const state = ordersReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toEqual([]);
  });

  it('должен очищать заказы и ошибки при clearOrders', () => {
    const filledState = {
      orders: [
        {
          _id: '1',
          number: 201,
          status: 'done',
          name: 'Заказ на очистку',
          ingredients: ['bun1'],
          createdAt: '2024-01-03T12:00:00.000Z',
          updatedAt: '2024-01-03T12:00:00.000Z'
        }
      ],
      isLoading: true,
      error: 'Ошибка старая'
    };

    const action = clearOrders();
    const state = ordersReducer(filledState, action);

    expect(state.orders).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
