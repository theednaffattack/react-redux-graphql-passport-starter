import axios from 'axios';

export default function setupAxiosInterceptors(onUnauthenticated) {
  const onRequestSuccess = (config) => {
    const newConfig = config;
    const token = localStorage.getItem('auth-token');
    if (token) {
      newConfig.headers['Authorization'] = 'JWT '.concat(token);
    }
    newConfig.timeout = 10000;
    return newConfig;
  };

  const onResponseSuccess = response => response;

  const onResponseError = (error) => {
    if (error.status === 403) {
      localStorage.removeItem('auth-token');
      onUnauthenticated();
    }
    return Promise.reject(error);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
}
