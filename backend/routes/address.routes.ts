import { Router } from 'express';
import Address from '../models/Address';

const router = Router();

router.get('/address/:id', async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/address', async (req, res) => {
  try {
    const address = await Address.findAll();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/address', async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.put('/address/:id', async (req, res) => {
  try {
    const address = await Address.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.delete('/address/:id', async (req, res) => {
  try {
    await Address.destroy({
      where: { id: req.params.id },
    });
    res.status(204).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;