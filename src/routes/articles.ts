import { Router } from 'express';
import { pool } from '../database';
import type { Article, ArticleWithUser } from '../interfaces';
import {
  authenticateToken,
  validateArticle,
} from '../middleware/auth-validation';
import type { ResultSetHeader } from 'mysql2';

const router = Router();

router.post(
  '/articles',
  authenticateToken,
  validateArticle,
  async (req, res) => {
    try {
      const { title, body, category } = req.body;
      const submittedBy = req.user!.id;

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
  },
);

router.get('/articles', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
             SELECT
                articles.id,
                articles.title,
                articles.body,
                articles.category,
                articles.submitted_by,
                articles.created_at
            FROM articles
            INNER JOIN users ON articles.submitted_by = users.id   
            ORDER BY articles.created_at DESC
            `);

    const articles = rows as ArticleWithUser[];
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

export default router;
