import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sorting = [
  { name: 'Popularity', value: 'rating' },
  { name: 'Price', value: 'price' },
  { name: 'Title', value: 'title' },
];

interface Sorting {
  categoryId: number;
  sortType: string;
  currentPage: number;
  searchQuery: string;
}

const initialState: Sorting = {
  categoryId: 0,
  sortType: 'rating',
  currentPage: 1,
  searchQuery: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setSearchQuery } = filterSlice.actions;
export default filterSlice.reducer;
