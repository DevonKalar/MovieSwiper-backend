import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../../config/db';

const registerRouter = Router();

registerRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, hashedPassword, email]
    );

    // Return user info
    res.status(201).json({
      message: 'User created successfully',
      user: result.rows[0]
    });

  } catch (error: any) {
    // Handle duplicate username
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Username already exists' });
    }
    
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default registerRouter;