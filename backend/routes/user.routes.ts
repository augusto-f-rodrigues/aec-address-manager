import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.post('/user', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/user/:id', async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.delete('/user/:id', async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;