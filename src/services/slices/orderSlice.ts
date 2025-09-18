import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  orderData: TOrder | null;
  orderRequest: boolean;
  orderError: string | null;
}

const initialState: OrderState = {
  orderData: null,
  orderRequest: false,
  orderError: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (orderNumber: string, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(Number(orderNumber));
      return res.orders[0];
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка получения заказа');
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
      state.orderError = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderByNumber.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(fetchOrderByNumber.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderData = action.payload;
    });
    builder.addCase(fetchOrderByNumber.rejected, (state, action) => {
      state.orderRequest = false;
      state.orderError = action.payload as string;
    });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
