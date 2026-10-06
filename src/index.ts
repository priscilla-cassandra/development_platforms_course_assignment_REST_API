import express from 'express';
import dotenv from 'dotenv';
import { pool } from './database';
import authRoutes from './routes/auth';
import articleRoutes from './routes/articles';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Add other routes here

app.use(express.json());
app.use('/auth', authRoutes);
app.use(articleRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
