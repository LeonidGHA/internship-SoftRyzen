import { createSlice } from '@reduxjs/toolkit';

const testingPageSlice = createSlice({
  name: 'testingPage',
  initialState: 0,
  reducers: {
    incrementPage(state) {
      return state + 1;
    },
    decrementPage(state) {
      return state - 1;
    },
  },
});

export const { incrementPage, decrementPage } = testingPageSlice.actions;

export const testingPageReducer = testingPageSlice.reducer;
