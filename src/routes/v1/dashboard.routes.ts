import { Router } from 'express';
import * as dashboardController from '../../controllers/dashboard.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/stats', authenticate, dashboardController.getStats);
router.get('/revenue', authenticate, dashboardController.getRevenueReport);
router.get('/occupancy', authenticate, dashboardController.getOccupancyRate);

export default router;