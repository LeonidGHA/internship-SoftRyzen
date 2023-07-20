import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ReduxUserState, IReduxAuthUser } from 'constants/types';

import {
  sendNewPassInstruction,
  sendChangedPass,
  sendEmailForRecover,
  logInAuth,
  currentUser,
  updateUser,
} from './auth-operations';

const initialUserReduxState: ReduxUserState = {
  refreshToken: '',
  accessToken: '',
  user: {
    id: null,
    firstName: '',
    avatar: null,
    direction: null,
    isLabelStream: false,
    isVerifiedEmail: false,
    roles: [''],
    stream: {
      streamDirection: '',
      isActive: false,
      startDate: '',
    },
    test: {
      isSent: false,
      isSuccess: false,
      startDate: null,
      endDate: null,
    },
    task: {
      isSent: false,
      isSuccess: false,
      deadlineDate: null,
    },
  },
  forgotPassword: {
    emailForRecover: '',
    wasInstructionSent: false,
    wasChangedPassSent: false,
  },
  isLoggedIn: false,
  isLoading: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialUserReduxState,
  reducers: {
    userAuth(state, { payload }: PayloadAction<IReduxAuthUser>) {
      state.refreshToken = payload.refreshToken;
      state.accessToken = payload.accessToken;
      state.user = payload.user;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    resetForgotPassSteps(state) {
      state.forgotPassword.wasInstructionSent = false;
      state.forgotPassword.wasChangedPassSent = false;
    },
    addEmailForRecover(state, { payload }) {
      state.forgotPassword.emailForRecover = payload.email;
    },
    clearEmailForRecover(state) {
      state.forgotPassword.emailForRecover = '';
    },
    logOutUser() {
      return initialUserReduxState;
    },
    setError(state, { payload }) {
      state.isError = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        currentUser.fulfilled,
        (state, { payload }: PayloadAction<IReduxAuthUser>) => {
          state.refreshToken = payload.refreshToken;
          state.accessToken = payload.accessToken;
          state.user = payload.user;
          state.isLoading = false;
          state.isLoggedIn = true;
        }
      )
      .addCase(currentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(logInAuth.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        logInAuth.fulfilled,
        (state, { payload }: PayloadAction<IReduxAuthUser>) => {
          state.refreshToken = payload.refreshToken;
          state.accessToken = payload.accessToken;
          state.user = payload.user;
          state.isLoading = false;
          state.isLoggedIn = true;
        }
      )
      .addCase(logInAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(sendNewPassInstruction.pending, (state: ReduxUserState) => {
        state.isLoading = true;
      })
      .addCase(sendNewPassInstruction.fulfilled, (state: ReduxUserState) => {
        state.forgotPassword.wasInstructionSent = true;
        state.isLoading = false;
      })
      .addCase(
        sendNewPassInstruction.rejected,
        (state: ReduxUserState, { payload }: { payload: any }) => {
          state.isError = payload;
          state.isLoading = false;
        }
      )
      .addCase(sendChangedPass.pending, (state: ReduxUserState) => {
        state.isLoading = true;
      })
      .addCase(sendChangedPass.fulfilled, (state: ReduxUserState) => {
        state.forgotPassword.wasChangedPassSent = true;
        state.isLoading = false;
      })
      .addCase(
        sendChangedPass.rejected,
        (state: ReduxUserState, { payload }: { payload: any }) => {
          state.isError = payload;
          state.isLoading = false;
        }
      )
      .addCase(sendEmailForRecover.pending, (state: ReduxUserState) => {
        state.isLoading = true;
      })
      .addCase(sendEmailForRecover.fulfilled, (state: ReduxUserState) => {
        state.isLoading = false;
      })
      .addCase(
        sendEmailForRecover.rejected,
        (state: ReduxUserState, { payload }: { payload: any }) => {
          state.isError = payload;
          state.isLoading = false;
        }
      )
      .addCase(updateUser.pending, (state: ReduxUserState) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        updateUser.fulfilled,
        (state: ReduxUserState, { payload }: PayloadAction<IReduxAuthUser>) => {
          state.refreshToken = payload.refreshToken;
          state.accessToken = payload.accessToken;
          state.user = payload.user;
          state.isLoading = false;
        }
      )
      .addCase(
        updateUser.rejected,
        (state: ReduxUserState, { payload }: { payload: any }) => {
          state.isError = payload;
          state.isLoading = false;
        }
      );
  },
});

export const {
  userAuth,

  setError,
  logOutUser,
  resetForgotPassSteps,
  addEmailForRecover,
  clearEmailForRecover,
} = authSlice.actions;

export default authSlice.reducer;
