import { Router } from 'express';
import * as manualBookingController from '../../controllers/manualBooking.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { authorize } from '../../middleware/role.middleware';  // ✅ Correction import

const router = Router();

// Routes existantes
router.post('/', authenticate, manualBookingController.createManualBooking);
router.get('/', authenticate, manualBookingController.listManualBookings);
router.post('/:id/approve', authenticate, manualBookingController.approveManualBooking);
router.post('/:id/reject', authenticate, manualBookingController.rejectManualBooking);


router.post(
  '/:id/generate-confirmation-id',
  authenticate,
  authorize(['admin', 'manager', 'reception']),  
  manualBookingController.generateConfirmationId
);


router.post(
  '/confirm',
  authenticate,
  manualBookingController.confirmManualBooking
);


router.get(
  '/:id',
  authenticate,
  manualBookingController.getManualBooking
);

export default router;