import { Router } from 'express';
import * as paymentAggregatorController from '../../controllers/paymentAggregator.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/initiate', authenticate, paymentAggregatorController.initiateAggregatorPayment);
router.get('/status/:reference', authenticate, paymentAggregatorController.checkAggregatorStatus);

export default router;