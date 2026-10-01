import { Router } from 'express';
import * as auditLogController from '../../controllers/auditLog.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, auditLogController.listAuditLogs);

export default router;