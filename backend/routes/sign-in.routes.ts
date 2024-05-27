import { Router } from 'express';
import { createUser } from '../services/user.service';

const router = Router();

router.post("/sign-in", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;