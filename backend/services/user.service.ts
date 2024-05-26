import User from '../models/User';

export async function createUser(userData: User) {
  try {
    const existingUser = await User.findOne({ where: { username: userData.username } });
    if (existingUser) {
      throw new Error('Nome de usuário já existe');
    }
    
    const user = await User.create(userData);
    return user;
  } catch (error: any) {
    if (error.message === 'Nome de usuário já existe') {
      throw new Error(error.message);
    } else {
      throw new Error('Erro ao criar usuário');
    }
  }
}

