import api from './api';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/api/v1/user');
    return response.data;
  },
  
  updateProfile: async (userData) => {
    const response = await api.put('/api/v1/user', userData);
    return response.data;
  },

  getUserById: async (userId) => {
    const response = await api.get(`/api/v1/user/${userId}`);
    return response.data;
  }
};