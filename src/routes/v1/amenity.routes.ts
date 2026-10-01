import { Router } from 'express';
import * as amenityController from '../../controllers/amenity.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, amenityController.createAmenity);
router.get('/', amenityController.listAmenities);
router.patch('/:id', authenticate, amenityController.updateAmenity);
router.delete('/:id', authenticate, amenityController.deleteAmenity);

export default router;