import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENV,
  withCredentials: true, 
});


api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Игнорируем refresh-запросы, чтобы избежать бесконечного цикла
    if (originalRequest.url === '/auth/refresh') {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh', {}, { withCredentials: true });
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
