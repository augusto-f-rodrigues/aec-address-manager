import axios from 'axios';
import jwt, { Secret } from 'jsonwebtoken';

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;

function encryptData(data: any) {
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
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export default api;
