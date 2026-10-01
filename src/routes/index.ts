import { Router } from 'express';
import v1Routes from './v1';
import webhookRoutes from './webhooks';

const router = Router();

router.use('/api/v1', v1Routes);
router.use('/webhooks', webhookRoutes);

export default router;