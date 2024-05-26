import { Router } from 'express';
import User from '../models/User';
import { createUser } from '../services/user.service';

const router = Router();

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/user', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/user', async (req, res) => {
  try {
    const user = await createUser(req.body);
    delete user.dataValues.id
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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