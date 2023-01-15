import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './Slices/FilterSlice';

export const store = configureStore({
  reducer: { filterReducer },
});
