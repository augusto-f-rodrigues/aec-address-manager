import api from './axios-setup.service';

export const createUser = async (userData: UserI) => {
  try {
    const response = await api.post('/sign-in', userData);
    return response.data;
  } catch (error) {
    console.error('Error fetching create user:', error);
    throw error;
  }
};
