import { Router } from 'express';
import paymentWebhookRoutes from './payment.webhooks';
import whatsappWebhookRoutes from './whatsapp.webhooks';

const router = Router();

router.use('/payments', paymentWebhookRoutes);
router.use('/whatsapp', whatsappWebhookRoutes);

export default router;