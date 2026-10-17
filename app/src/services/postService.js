import api from './api';

export const postService = {
  getFeed: async () => {
    const response = await api.get('/api/v1/explore');
    return response.data;
  },
  createPost: async (formData) => {
    const response = await api.post('/api/v1/create-post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  likePost: async (postId) => {
    const response = await api.post(`/api/v1/like/${postId}`);
    return response.data;
  },
  unlikePost: async (postId) => {
    const response = await api.post(`/api/v1/unlike/${postId}`);
    return response.data;
  },
  addComment: async (postId, comment) => {
    const response = await api.post(`/api/v1/create-comment/${postId}`, { comment });
    return response.data;
  },
};