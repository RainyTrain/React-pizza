import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './Slices/FilterSlice';
import cartReducer from './Slices/CartSlice';
import pizzaReducer from './Slices/PizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filterReducer, cartReducer, pizzaReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
