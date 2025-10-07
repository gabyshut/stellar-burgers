import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderCreateState {
  orderData: TOrder | null;
  orderRequest: boolean;
  orderError: string | null;
}

const initialState: OrderCreateState = {
  orderData: null,
  orderRequest: false,
  orderError: null
};

export const makeOrder = createAsyncThunk(
  'orderCreate/makeOrder',
  async (ingredientsIds: string[], { rejectWithValue }) => {
    try {
      const res = await orderBurgerApi(ingredientsIds);
      return res.order;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка оформления заказа');
    }
  }
);

const orderCreateSlice = createSlice({
  name: 'orderCreate',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
      state.orderRequest = false;
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(makeOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.orderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload as string;
      });
  }
});

export const { clearOrder } = orderCreateSlice.actions;
export default orderCreateSlice.reducer;
