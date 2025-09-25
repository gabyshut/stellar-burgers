jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(() => Promise.resolve({ order: '123' }))
}));

import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';

// Моки ингредиентов
const bun: TConstructorIngredient = {
  _id: '1',
  id: 'bun-uuid-1', // уникальный id для конструктора
  name: 'Тестовая булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 150,
  price: 50,
  image: 'https://test/bun.png',
  image_mobile: 'https://test/bun-mobile.png',
  image_large: 'https://test/bun-large.png'
};

const ingredient: TConstructorIngredient = {
  _id: '2',
  id: 'ing-uuid-1',
  name: 'Тестовая начинка',
  type: 'main',
  proteins: 20,
  fat: 15,
  carbohydrates: 5,
  calories: 250,
  price: 80,
  image: 'https://test/main.png',
  image_mobile: 'https://test/main-mobile.png',
  image_large: 'https://test/main-large.png'
};

describe('constructorSlice', () => {
  it('добавляет булку', () => {
    const state = constructorReducer(undefined, addIngredient(bun));
    expect(state.bun).toEqual(
      expect.objectContaining({ name: 'Тестовая булка' })
    );
  });

  it('добавляет ингредиент', () => {
    const state = constructorReducer(undefined, addIngredient(ingredient));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({ name: 'Тестовая начинка' })
    );
  });

  it('удаляет ингредиент', () => {
    const stateWithIngredient = constructorReducer(
      undefined,
      addIngredient(ingredient)
    );
    const id = stateWithIngredient.ingredients[0].id;
    const state = constructorReducer(stateWithIngredient, removeIngredient(id));
    expect(state.ingredients.length).toBe(0);
  });

  it('меняет порядок ингредиентов', () => {
    const state1 = constructorReducer(undefined, addIngredient(ingredient));
    const state2 = constructorReducer(
      state1,
      addIngredient({
        ...ingredient,
        id: 'ing-uuid-2',
        _id: '3',
        name: 'Тестовая начинка 2'
      })
    );

    // до перемещения
    expect(state2.ingredients.map((i) => i.name)).toEqual([
      'Тестовая начинка',
      'Тестовая начинка 2'
    ]);

    const state3 = constructorReducer(
      state2,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );

    // после перемещения
    expect(state3.ingredients.map((i) => i.name)).toEqual([
      'Тестовая начинка 2',
      'Тестовая начинка'
    ]);
  });

  it('очищает конструктор', () => {
    let state = constructorReducer(undefined, addIngredient(bun));
    state = constructorReducer(state, addIngredient(ingredient));
    state = constructorReducer(state, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
