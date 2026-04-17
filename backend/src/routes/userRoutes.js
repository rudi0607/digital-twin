import { Router } from 'express';
import { getProfile, updatePreferences } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.patch('/preferences', authMiddleware, updatePreferences);

export default router;
