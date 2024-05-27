import { useRouter } from 'next/navigation';
import api from './axios-setup.service';

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post(`/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    localStorage.removeItem('token');
        
    const router = useRouter();
    router.push('/');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};
