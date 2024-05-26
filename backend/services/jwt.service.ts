import jwt from 'jsonwebtoken';

export function generateToken(username: string): string {
  const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
}
