import api from './axios-setup.api';

export const getAddressById = async (id: string) => {
  try {
    const response = await api.get(`/address/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address by id:', error);
    throw error;
  }
};

export const getAllAddresses = async () => {
  try {
    const response = await api.get('/address');
    return response.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

export const getAllAddressesByUserId = async (userId: string) => {
  try {
    const response = await api.get(`/address/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

export const createAddress = async (addressData: AddressI) => {
  try {
    const response = await api.post('/address', addressData);
    return response.data;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};

export const updateAddress = async (id: string, addressData: AddressI) => {
  try {
    const response = await api.put(`/address/${id}`, addressData);
    return response.data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

export const deleteAddress = async (id: string) => {
  try {
    await api.delete(`/address/${id}`);
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};
