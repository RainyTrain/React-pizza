import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPizza {
  title: string;
  type: string;
  size: number;
  price: number;
  id: number;
  imageUrl: string;
  quantity: number;
}

interface ICart {
  items: IPizza[];
  totalPrice: number;
  count: number;
}

const initialState: ICart = {
  items: [],
  totalPrice: 0,
  count: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<IPizza>) {
      const findPizza = state.items.find(
        (item) =>
          item.title == action.payload.title &&
          item.type == action.payload.type &&
          item.size == action.payload.size,
      );
      if (!findPizza) {
        state.items.push({ ...action.payload });
      } else {
        const index = state.items.indexOf(findPizza);
        state.items = [
          ...state.items.slice(0, index),
          { ...findPizza, quantity: findPizza.quantity + 1 },
          ...state.items.slice(index + 1),
        ];
      }
      state.totalPrice += action.payload.price;
      state.count += 1;
    },
    removeItem(state, action: PayloadAction<number>) {
      const findPizza = state.items.find((item) => item.id == action.payload);
      const newCart = state.items.filter((item) => item.id != action.payload);
      state.items = newCart;
      if (findPizza) {
        state.totalPrice -= findPizza.price * findPizza.quantity;
        state.count -= 1;
      }
    },
    clearCart(state) {
      state.items = initialState.items;
      state.totalPrice = initialState.totalPrice;
      state.count = initialState.count;
    },
    plusItem(state, action: PayloadAction<number>) {
      const findPizza = state.items.find((item) => item.id == action.payload);
      if (findPizza) {
        const index = state.items.indexOf(findPizza);
        state.items = [
          ...state.items.slice(0, index),
          { ...findPizza, quantity: findPizza.quantity + 1 },
          ...state.items.slice(index + 1),
        ];
        state.totalPrice += findPizza.price;
        state.count += 1;
      }
    },
    minusItem(state, action: PayloadAction<number>) {
      const findPizza = state.items.find((item) => item.id == action.payload);
      if (findPizza) {
        const index = state.items.indexOf(findPizza);
        if (findPizza.quantity > 1) {
          state.items = [
            ...state.items.slice(0, index),
            { ...findPizza, quantity: findPizza.quantity - 1 },
            ...state.items.slice(index + 1),
          ];
        } else {
          state.items = [...state.items.slice(0, index), ...state.items.slice(index + 1)];
        }
        state.totalPrice -= findPizza.price;
        state.count -= 1;
      }
    },
  },
});

export const { setItem, removeItem, clearCart, plusItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
