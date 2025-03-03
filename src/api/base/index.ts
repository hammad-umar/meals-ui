import axios, { AxiosInstance } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';

import { store } from '../../zustand/store';

export const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

axiosClient.interceptors.request.use(
  (config) => {
    const { Authentication: token } = parseCookies();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response && response?.statusText === 'Unauthorized' && response?.status === 401) {
      store.getState().logout();
      destroyCookie({}, 'Authentication');
    }

    return Promise.reject(error);
  }
);
