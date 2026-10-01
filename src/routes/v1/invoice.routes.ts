import { Router } from 'express';
import { authenticate, authorizeRoles } from '../../middleware/auth.middleware';
import * as invoiceController from '../../controllers/invoice.controller';

const router = Router();

// L'utilisateur doit être connecté pour toutes ces routes
router.use(authenticate); 

// Routes accessibles au client (avec filtrage par req.user.id dans le controller)
router.get('/', invoiceController.listInvoices);
router.get('/:id', invoiceController.getInvoiceById);

// Routes strictement réservées aux administrateurs (ou au système/webhook)
router.patch('/:id/mark-paid', authorizeRoles('ADMIN', 'SYSTEM'), invoiceController.markAsPaid);
router.patch('/:id/cancel', authorizeRoles('ADMIN', 'SYSTEM'), invoiceController.cancelInvoice);

export default router;