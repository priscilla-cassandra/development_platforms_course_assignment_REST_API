import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  res.status(201).json(req.body);
});

export default router;
