import { Router } from 'express';
import { verifyWebhook, handleWebhook } from '../../whatsapp/whatsapp.webhook';

const router = Router();

router.get('/', verifyWebhook);
router.post('/', handleWebhook);

export default router;