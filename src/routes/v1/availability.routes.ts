import { Router } from 'express';
import * as availabilityController from '../../controllers/availability.controller';

const router = Router();

router.get('/check', availabilityController.checkAvailability);
router.get('/calendar/:propertyId', availabilityController.getOccupancyCalendar);

export default router;