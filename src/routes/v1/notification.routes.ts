import { Router } from 'express';
import * as notificationController from '../../controllers/notification.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, notificationController.listNotifications);
router.patch('/:id/read', authenticate, notificationController.markAsRead);

export default router;