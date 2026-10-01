import { Router } from 'express';
import * as calendarController from '../../controllers/calendar.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/block', authenticate, calendarController.blockDates);
router.delete('/block/:blockId', authenticate, calendarController.unblockDates);
router.get('/blocks', authenticate, calendarController.listBlockedDates);

export default router;