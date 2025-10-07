import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice reducer', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null as string | null
  };

  it('должен ставить isLoading = true при pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ингредиенты и ставить isLoading = false при fulfilled', () => {
    const mockIngredients = [
      { _id: '1', name: 'Булка', type: 'bun' },
      { _id: '2', name: 'Котлета', type: 'main' }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку и ставить isLoading = false при rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';

    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.items).toEqual([]);
  });
});
