import jwt from 'jsonwebtoken';
import User from '../models/User';
import Address from '../models/Address';

export function generateToken(payload: User | Address): string {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
}
