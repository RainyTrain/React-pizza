import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './Slices/FilterSlice';
import cartReducer from './Slices/CartSlice';

export const store = configureStore({
  reducer: { filterReducer, cartReducer },
});
