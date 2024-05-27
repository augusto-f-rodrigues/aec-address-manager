import api from './axios-setup.api';

export const createUser = async (userData: UserI) => {
  try {
    const response = await api.post('/sign-in', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
