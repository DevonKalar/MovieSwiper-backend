import { Router } from 'express';
import openaiRoutes from './api/openai';

const router = Router();

router.use('/api/openai', openaiRoutes);

export default router;