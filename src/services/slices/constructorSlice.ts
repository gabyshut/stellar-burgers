import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { orderBurgerApi } from '@api';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: any | null;
  error: string | null;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null
};

// Thunk для отправки заказа на сервер
export const sendOrder = createAsyncThunk(
  'constructor/sendOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredientIds);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка запроса');
    }
  }
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ing) => ing.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const moved = state.ingredients.splice(dragIndex, 1)[0];
      state.ingredients.splice(hoverIndex, 0, moved);
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(sendOrder.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload;
      state.ingredients = [];
      state.bun = null;
    });
    builder.addCase(sendOrder.rejected, (state, action) => {
      state.orderRequest = false;
      state.error = action.payload as string;
    });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  closeOrderModal,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
