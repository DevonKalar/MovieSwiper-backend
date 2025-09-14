import { Router } from 'express';
import openaiRoutes from './api/openai';
import moviesRouter from './api/tmdb';

const router = Router();

router.use('/api/openai', openaiRoutes);
router.use('/api/tmdb', moviesRouter);

export default router;