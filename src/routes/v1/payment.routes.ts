import { Router } from 'express';
import * as paymentController from '../../controllers/payment.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, paymentController.listPayments);
router.post('/initiate', authenticate, paymentController.initiatePayment);
router.post('/verify', authenticate, paymentController.verifyPayment);
router.get('/:id/status', authenticate, paymentController.getPaymentStatus);
router.post('/refund', authenticate, paymentController.refundPayment);

export default router;