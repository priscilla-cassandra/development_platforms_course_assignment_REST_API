import { Router } from 'express';
import { pool } from '../database';
import type { Article } from '../interfaces';
import { authenticateToken } from '../middleware/auth-validation';
import type { ResultSetHeader } from 'mysql2';

const router = Router();

router.post('/articles', authenticateToken, async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const submittedBy = req.user!.id;

    if (!title || !body || !category) {
      return res.status(400).json({
        error: 'Title, body and category are required',
      });
    }

    const [result]: [ResultSetHeader, any] = await pool.execute(
      'INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)',
      [title, body, category, submittedBy],
    );

    const article: Article = {
      id: result.insertId,
      title,
      body,
      category,
      submitted_by: submittedBy,
    };
    res.status(201).json(article);
  } catch (error) {
    console.error('POST/articles failed', error);
    res.status(500).json({
      error: 'Failed to create article',
    });
  }
});

export default router;
