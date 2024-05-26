import bcrypt from 'bcryptjs';

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
