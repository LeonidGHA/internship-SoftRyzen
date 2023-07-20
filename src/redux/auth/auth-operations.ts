import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from 'redux/store';
import {
  error500,
  error401Login,
  error429,
  error404,
} from 'data/ErrorNotificationText.json';

import { useAxiosConfig } from '../../../src/services/axiosConfig';

import notificate from 'utils/notificate';

import type { CheckEmailInputs } from 'modules/forms/CheckEmailForm/CheckEmailForm';
import type { FormInputsType } from '../formDataCollector/formDataSlice';
import type { FullUpdatePassFormData } from 'modules/forms/UpdatePassForm/UpdatePassForm';
import type { EmailForRecoverType } from 'modules/ForgotPassPageComponent/CheckYourMail/CheckYourMail';

interface IUserInfoInput {
  email: string;
  password: string;
}

export const registerAuth = createAsyncThunk(
  'auth/register',
  async (registerData: IUserInfoInput, thunkApi) => {
    try {
      const { axiosPublicInstance } = useAxiosConfig();
      await axiosPublicInstance.post('auth/register', registerData);
    } catch (error) {
      const newError = error as AxiosError;
      const errorCode = newError.response?.status;
      if (errorCode === 404) {
        notificate('error', error500.title, error500.message);
        return thunkApi.rejectWithValue(newError.response?.request.response);
      }

      if (errorCode === 500) {
        notificate('error', error500.title, error500.message);
        return thunkApi.rejectWithValue(newError.response?.request.response);
      }
    }
  }
);

export const logInAuth = createAsyncThunk(
  'auth/logIn',
  async (loginData: IUserInfoInput, thunkApi) => {
    try {
      const { axiosPublicInstance } = useAxiosConfig();
      const { data } = await axiosPublicInstance.post('auth/login', loginData);

      return data;
    } catch (error) {
      const newError = error as AxiosError;
      const errorCode = newError.response?.status;
      if (errorCode === 401) {
        notificate('error', error401Login.title, error401Login.message);
        return thunkApi.rejectWithValue(newError.response?.request.response);
      }
      if (errorCode === 429) {
        notificate('error', error429.title, error429.message);
        return thunkApi.rejectWithValue(newError.response?.request.response);
      }
      if (errorCode === 500) {
        notificate('error', error500.title, error500.message);
        return thunkApi.rejectWithValue(newError.response?.request.response);
      }
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { authPrivateHeader, axiosPrivateInstance } = useAxiosConfig();
      const state = getState() as RootState;
      const savedToken = state.auth.accessToken;

      if (!savedToken) {
        return rejectWithValue('brokenToken');
      }
      authPrivateHeader.set(savedToken);

      const { data } = await axiosPrivateInstance.get('users/current');
      return data;
    } catch (error) {
      const newError = error as AxiosError;
      const errorCode = newError.response?.status;
      if (errorCode === 401) {
        return rejectWithValue(newError.response?.request.response);
      }
      if (errorCode === 404) {
        notificate('error', '', error404);
        return rejectWithValue(newError.response?.request.response);
      }
      if (errorCode === 500) {
        notificate('error', error500.title, error500.message);
        return rejectWithValue(newError.response?.request.response);
      }
    }
  }
);

export const sendNewPassInstruction = createAsyncThunk(
  'auth/forgotPass/sendInstruction',
  async (formData: CheckEmailInputs, { rejectWithValue }) => {
    try {
      const { axiosPublicInstance } = useAxiosConfig();
      const { data } = await axiosPublicInstance.post(
        'auth/request-change-password',
        formData
      );
      return data === 'ok';
    } catch (error: any) {
      notificate('error', '', error.message);
      return rejectWithValue(error?.message);
    }
  }
);

export const sendChangedPass = createAsyncThunk(
  'auth/forgotPass/sendChangedPass',
  async (formData: FullUpdatePassFormData, { rejectWithValue }) => {
    const { accessToken, inputs } = formData;
    try {
      const { axiosPrivateInstance } = useAxiosConfig();
      const result = await axiosPrivateInstance.patch('auth/change-password', inputs, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result.status === 200;
    } catch (error: any) {
      notificate('error', '', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const sendEmailForRecover = createAsyncThunk(
  'auth/forgotPass/sendEmailForRecoverAgain',
  async (data: EmailForRecoverType, { rejectWithValue }) => {
    try {
      const { axiosPublicInstance } = useAxiosConfig();
      const result = await axiosPublicInstance.post('auth/resend-email', data);
      const isSuccess = result.status === 201;
      if (isSuccess) {
        notificate('success', 'Успіх', 'Перевірте свою пошту');
      }
    } catch (error: any) {
      notificate('error', '', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (formData: FormInputsType, { getState, rejectWithValue }) => {
    try {
      const { axiosPrivateInstance, authPrivateHeader } = useAxiosConfig();
      const state = getState() as RootState;
      const savedToken = state.auth.accessToken;

      if (!savedToken) {
        return rejectWithValue('brokenToken');
      }
      authPrivateHeader.set(savedToken);

      const { data } = await axiosPrivateInstance.patch('users/update', formData);

      notificate('success', 'Успішно', 'Ваші дані збережені');

      return data;
    } catch (error) {
      const newError = error as AxiosError;
      const errorCode = newError.response?.status;
      if (errorCode === 404) {
        notificate('error', '', error404);
        return rejectWithValue(error);
      }
      if (errorCode === 500) {
        notificate('error', error500.title, error500.message);
        return rejectWithValue(error);
      }
    }
  }
);
