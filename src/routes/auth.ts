import { Router } from 'express';
import { pool } from '../database';
import type { User } from '../interfaces';
import bcrypt from 'bcrypt';
import type { ResultSetHeader } from 'mysql2';
import type { UserResponse } from '../interfaces';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password_hash } = req.body;

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
    const hashedPassword = await bcrypt.hash(password_hash, saltRounds);

    //Create user in database
    const [result]: [ResultSetHeader, any] = await pool.execute(
      'INSTERT INTO users (email, password_hash) VALUES(?, ?)',
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
