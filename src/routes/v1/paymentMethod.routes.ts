import { Router } from 'express';
import * as paymentMethodController from '../../controllers/paymentMethod.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', paymentMethodController.listPaymentMethods);
router.patch('/:id/toggle', authenticate, paymentMethodController.togglePaymentMethod);

export default router;