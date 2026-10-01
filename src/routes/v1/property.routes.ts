import { Router } from 'express';
import * as propertyController from '../../controllers/property.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', propertyController.listProperties);
router.get('/:id', propertyController.getProperty);
router.post('/', authenticate, propertyController.createProperty);
router.patch('/:id', authenticate, propertyController.updateProperty);
router.delete('/:id', authenticate, propertyController.deleteProperty);

export default router;