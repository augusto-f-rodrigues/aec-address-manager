import User from "../models/User";
import { generateToken } from "./jwt.service";
import bcrypt from "bcryptjs";

export async function login(userData: User) {
  try {
    const { username, password } = userData;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.error("Usuário ou senha inválidos");
      throw new Error("Usuário ou senha inválidos");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Usuário ou senha inválidos");
      throw new Error("Usuário ou senha inválidos");
    }

    const token = generateToken(user.dataValues as User);
    return token;
  } catch (error: any) {
    if (error.message === "Usuário ou senha inválidos") {
      console.error(error.message);
      throw new Error(error.message);
    } else {
      console.error("Erro tentar realizar login");
      throw new Error("Erro tentar realizar login");
    }
  }
}
