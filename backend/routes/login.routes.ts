import bcrypt from 'bcryptjs';
import { Router } from "express";
import User from "../models/User";
import { generateToken } from "../services/jwt.service";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Usuário ou senha inválidos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Usuário ou senha inválidos" });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
