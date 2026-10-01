import { Router } from 'express';
import * as promotionController from '../../controllers/promotion.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, promotionController.createPromotion);
router.get('/', promotionController.listPromotions);
router.post('/validate', promotionController.validatePromotion);
router.delete('/:id', authenticate, promotionController.deletePromotion);

export default router;