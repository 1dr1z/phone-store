import axios from 'axios';
import { FIREBASE_DATABASE } from '../Constants';

const AxiosAuthenticatedRequests = axios.create();
AxiosAuthenticatedRequests.defaults.baseURL = FIREBASE_DATABASE;
AxiosAuthenticatedRequests.defaults.headers.common = {
  'Content-Type': 'application/json',
};

AxiosAuthenticatedRequests.interceptors.request.use((config) => {
  const authFromLocalStorage = JSON.parse(localStorage.getItem('auth'));
  if (authFromLocalStorage) {
    config.params = {
      ...config.params,
      auth: authFromLocalStorage.jwtToken,
    };
  }
  return config;
});

export default AxiosAuthenticatedRequests;
