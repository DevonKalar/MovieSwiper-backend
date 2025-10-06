import { Router } from 'express';
import openaiRoutes from './api/openai';
import moviesRouter from './api/tmdb';
import loginRouter from './auth/login';
import registerRouter from './auth/register';
import { apiLimiter } from '../middleware/rateLimit';

const router = Router();

router.use('/api/openai', apiLimiter, openaiRoutes);
router.use('/api/tmdb', apiLimiter, moviesRouter);
router.use('/auth/login', loginRouter);
router.use('/auth/register', registerRouter);

export default router;