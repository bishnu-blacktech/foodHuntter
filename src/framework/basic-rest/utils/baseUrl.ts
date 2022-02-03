import axios from 'axios';
import { getToken } from './get-token';

const base = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEPLOYED_URL,
  timeout: 30000,
});

// Adding bearer token here using the interceptors

base.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default base;
