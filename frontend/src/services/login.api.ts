import api from './axios-setup.api';

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post(`/login/`, {username, password});
    return response.data;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
};
