import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically attach authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication failures
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and auth states
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login silently
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
