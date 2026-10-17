import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/api/v1/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/api/v1/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/api/v1/user');
    return response.data;
  },
};