import axios from 'axios';
import { RootState } from '../redux/store';

let store: { getState: () => RootState };

export const injectStore = (_store: { getState: () => RootState }) => {
  store = _store;
};

export const useAxiosConfig = () => {
  const state = store.getState();
  const stateRefreshToken = state.auth.refreshToken;

  const axiosPublicInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
  });

  const axiosPrivateInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
      'token-type': 'access_token',
    },
  });

  const axiosRefreshIstanse = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${stateRefreshToken}`,
      'token-type': 'refresh_token',
    },
  });

  const authPrivateHeader = {
    set: (token: string) => {
      axiosPrivateInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    unset: () => {
      axiosPrivateInstance.defaults.headers.common['Authorization'] = '';
    },
  };

  axiosPrivateInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const { data } = await axiosRefreshIstanse.get('auth/refresh-token');
          originalConfig.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosPrivateInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      return Promise.reject(err);
    }
  );

  return { authPrivateHeader, axiosPublicInstance, axiosPrivateInstance };
};
