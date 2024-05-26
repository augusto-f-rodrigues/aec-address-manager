import User from '../models/User';
import { generateToken } from './jwt.service';
import bcrypt from 'bcryptjs';


export async function createUser(userData: User) {
  try {
    const existingUser = await User.findOne({ where: { username: userData.username } });
    if (existingUser) {
      throw new Error('Nome de usuário já existe');
    }
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    
    await User.create(userData);

    const token = generateToken(userData);
    return token;
  } catch (error: any) {
    if (error.message === 'Nome de usuário já existe') {
      throw new Error(error.message);
    } else {
      throw new Error('Erro ao criar usuário');
    }
  }
}


