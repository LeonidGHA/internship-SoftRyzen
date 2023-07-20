import { RootState } from 'constants/types';

export const isAuthLoading = (state: RootState) => state.auth.isLoading;
export const isAuthError = (state: RootState) => state.auth.isError;
export const didNewPassInstructionSent = (state: RootState) =>
  state.auth.forgotPassword.wasInstructionSent;
export const didChangedPassSent = (state: RootState) =>
  state.auth.forgotPassword.wasChangedPassSent;
export const userData = (state: RootState) => state.auth.user;
export const getEmailForRecover = (state: RootState) =>
  state.auth.forgotPassword.emailForRecover;

export const getTestData = (state: RootState) => state.auth.user.test;
export const getTaskData = (state: RootState) => state.auth.user.task;
