import { createSlice } from '@reduxjs/toolkit';

export const sorting = [
  { name: 'Popularity', value: 'rating' },
  { name: 'Price', value: 'price' },
  { name: 'Title', value: 'title' },
];

const initialState = {
  categoryId: 0,
  sortType: 'rating',
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sortType = action.payload.sortType;
      state.categoryId = Number(action.payload.pizzaCategory);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
