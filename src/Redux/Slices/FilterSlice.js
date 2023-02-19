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
  searchQuery: '',
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
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchQuery } =
  filterSlice.actions;
export default filterSlice.reducer;
