import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  count: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItem(state, action) {
      state.items.push({ ...action.payload });
      state.totalPrice += action.payload.price;
      state.count += 1;
    },
    removeItem(state, action) {
      const newCart = state.items.filter((item) => item.id != action.payload);
      state.items = newCart
      // state.totalPrice -= action.payload.price;
    },
  },
});

export const { setItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
