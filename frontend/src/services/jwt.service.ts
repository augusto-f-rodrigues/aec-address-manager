import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const secretKey: Secret = process.env.NEXT_PUBLIC_JWT_SECRET!; 

export const decryptData = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
};


export function encryptData(data: any) {
  return jwt.sign(
    data,
    secretKey as Secret,
  );
}
