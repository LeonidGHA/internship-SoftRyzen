import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type StageType = {
  isActive: boolean;
  isFailed: boolean;
  isSuccess: boolean;
};

export type ProgressStatusType = {
  test: StageType;
  task: StageType;
  interview: StageType;
  offer: StageType;
};

const initialState: ProgressStatusType = {
  test: {
    isActive: false,
    isFailed: false,
    isSuccess: false,
  },
  task: {
    isActive: false,
    isFailed: false,
    isSuccess: false,
  },
  interview: {
    isActive: false,
    isFailed: false,
    isSuccess: false,
  },
  offer: {
    isActive: false,
    isFailed: false,
    isSuccess: false,
  },
};

const progressStatusSlice = createSlice({
  name: 'progressStatus',
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<Partial<ProgressStatusType>>) => {
      state.test = { ...state.test, ...action.payload.test };
      state.task = { ...state.task, ...action.payload.task };
    },
  },
});

export const { updateStatus } = progressStatusSlice.actions;

export const progressStatusReducer = progressStatusSlice.reducer;
