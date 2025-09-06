import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import constructorSlice from './slices/constructorSlice';

export const rootReducer = combineReducers({
  ingredientsSlice,
  constructorSlice
});
