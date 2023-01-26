import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItem(state, action) {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removeItem(state, action) {
      state.items.filter((item) => item.id != action.payload);
      state.totalPrice += action.payload.price;
    },
  },
});

export const { setItem } = cartSlice.actions;
export default cartSlice.reducer;
