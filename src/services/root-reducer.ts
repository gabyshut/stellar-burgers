import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import constructorSlice from './slices/constructorSlice';
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';
import ordersSlice from './slices/ordersSlice';
import orderCreateSlice from './slices/orderCreateSlice';

export const rootReducer = combineReducers({
  ingredientsSlice,
  constructorSlice,
  userSlice,
  orderSlice,
  ordersSlice,
  orderCreateSlice
});
