import { Router } from 'express';
import { getSummaryStats } from '../controllers/stats.controller.js';

const router = Router();

router.get('/summary', getSummaryStats);

export default router;
