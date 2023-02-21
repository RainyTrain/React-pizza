import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface PizzaSlice {
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  id: number;
  imageUrl: string;
  quantity: number;
}

interface InitialState {
  items: PizzaSlice[];
  isLoading: true | false;
}

type FetchPizzasType = {
  category: string;
  sortBy: string;
  currentPage: number;
};

const initialState: InitialState = {
  items: [],
  isLoading: true,
};

export const fetchPizzas = createAsyncThunk('pizza/getPizza', async (params: FetchPizzasType) => {
  const { category, sortBy, currentPage } = params;
  const response = await axios.get(
    `https://639b4244d514150197507472.mockapi.io/pizzas?${category}&${sortBy}&page=${currentPage}&limit=4`,
  );
  return response.data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
  },
});

export default pizzaSlice.reducer;
