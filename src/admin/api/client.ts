import axios from 'axios';
import { ADMIN_API_BASE_URL, ADMIN_TOKEN_STORAGE_KEY } from '../types';

export const adminApiClient = axios.create({ baseURL: ADMIN_API_BASE_URL });

/** Attach the stored JWT to every outgoing request. */
adminApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * On a 401 the token is stale/invalid — drop it so the next route guard sends
 * the admin back to /admin/login. The error is re-thrown so callers can react.
 */
adminApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    }
    return Promise.reject(error);
  }
);
