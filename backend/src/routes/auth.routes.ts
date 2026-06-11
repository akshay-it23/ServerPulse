import { Router } from 'express';
import { login, register, getMe, logout } from '../controllers/auth.controller.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, login);
router.post('/register', register);
router.get('/me', getMe);
router.post('/logout', logout);

export default router;
