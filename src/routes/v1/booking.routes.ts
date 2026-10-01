import { Router } from 'express';
import * as bookingController from '../../controllers/booking.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { preventSurbooking } from '../../middleware/preventSurbooking.middleware';

const router = Router();

router.post('/', authenticate, preventSurbooking, bookingController.createBooking);
router.get('/', authenticate, bookingController.listBookings);
router.get('/:id', authenticate, bookingController.getBooking);
router.patch('/:id/cancel', authenticate, bookingController.cancelBooking);

export default router;