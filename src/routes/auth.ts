import { Router } from 'express';
import { pool } from '../database';
import bcrypt from 'bcrypt';
import type { ResultSetHeader } from 'mysql2';
import type { UserResponse, User } from '../interfaces';
import { validateRegistration } from '../middleware/auth-validation';

const router = Router();

router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.execute(`SELECT id FROM users WHERE email = ?`, [
      email,
    ]);

    //Check it user already exists
    const existingUsers = rows as User[];

    if (existingUsers.length > 0) {
      return res.status(409).json({
        error: 'User with this email already exists',
      });
    }

    //Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Create user in database (with the hashed password)
    const [result]: [ResultSetHeader, any] = await pool.execute(
      'INSERT INTO users (email, password_hash) VALUES(?, ?)',
      [email, hashedPassword],
    );

    //Return user info (without password)
    const userResponse: UserResponse = {
      id: result.insertId,
      email,
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Registration error', error);
    res.status(500).json({
      error: 'Failed to register user',
    });
  }
});

export default router;
