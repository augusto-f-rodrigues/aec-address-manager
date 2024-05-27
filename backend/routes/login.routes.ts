import { Router } from "express";
import { login } from "../services/login.service";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const token = await login(req.body);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
