import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from '../slices/ingredients/ingredientsSlice';
import constructorSlice from '../slices/constructor/constructorSlice';
import orderSlice from '../slices/order/orderSlice';
import ordersSlice from '../slices/orders/ordersSlice';
import orderCreateSlice from '../slices/orderCreate/orderCreateSlice';
import feedSlice from '../slices/feed/feedSlice';
import userSlice from '../slices/user/userSlice';

export const rootReducer = combineReducers({
  ingredientsSlice,
  constructorSlice,
  userSlice,
  orderSlice,
  ordersSlice,
  orderCreateSlice,
  feedSlice
});
