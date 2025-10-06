import { Router, Request, Response }  from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { pool } from '../../config/db'


const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: 'JWT_SECRET is not configured' });
        }

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default loginRouter;
