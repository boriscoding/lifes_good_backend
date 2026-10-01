import { Router } from 'express';
import * as whatsappController from '../../controllers/whatsapp.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post('/send', authenticate, whatsappController.sendMessage);
router.post('/template', authenticate, whatsappController.sendTemplate);

export default router;