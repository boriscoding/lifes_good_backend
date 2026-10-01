import { Router } from 'express';
import { sendContactMessage } from '../../controllers/contract.controller';

const router = Router();

router.post('/', sendContactMessage);

export default router;