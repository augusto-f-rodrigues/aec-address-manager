import axios from 'axios';

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;

/* function encryptData(data: any) {
  return jwt.sign(
    data,
    secretKey as Secret,
  );
}

function decryptData(token: string) {
  try {
    return jwt.verify(token, secretKey as Secret);
  } catch (error) {
    throw new Error('Token inválido');
  }
} */

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

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

export default api;
