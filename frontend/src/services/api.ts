import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData: UserI) => {
  try {
    const response = await api.post('/user', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await api.put(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await api.delete(`/user/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
