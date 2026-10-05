import express from 'express';
import dotenv from 'dotenv';
import { pool } from './database';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Add other routes here

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', async (req, res) => {
  await pool.query('SELECT 1');
  res.json({ message: 'API and database are working' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
