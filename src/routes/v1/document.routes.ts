import { Router } from 'express';
import * as documentController from '../../controllers/document.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/invoice/:bookingId', authenticate, documentController.generateInvoice);
router.get('/receipt/:paymentId', authenticate, documentController.generateReceipt);
router.get('/contract/:contractId', authenticate, documentController.generateContract);

export default router;