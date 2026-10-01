import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import propertyRoutes from './property.routes';
import bookingRoutes from './booking.routes';
import manualBookingRoutes from './manualBooking.routes';
import paymentRoutes from './payment.routes';
import paymentAggregatorRoutes from './paymentAggregator.routes';
import paymentMethodRoutes from './paymentMethod.routes';
import availabilityRoutes from './availability.routes';
import calendarRoutes from './calendar.routes';
import documentRoutes from './document.routes';
import invoiceRoutes from './invoice.routes';
import notificationRoutes from './notification.routes';
import dashboardRoutes from './dashboard.routes';
import auditLogRoutes from './auditLog.routes';
import whatsappRoutes from './whatsapp.routes';
import mediaRoutes from './media.routes';
import promotionRoutes from './promotion.routes';
import contractRoutes from './contract.routes';
import amenityRoutes from './amenity.routes';
import publicationroutes from './publication.routes';
import roomRoutes from './room.route';
import officeRoutes from './office.route';
import apartmentRoutes from './apartment.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/properties', propertyRoutes);
router.use('/bookings', bookingRoutes);
router.use('/manual-bookings', manualBookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/payment-aggregators', paymentAggregatorRoutes);
router.use('/payment-methods', paymentMethodRoutes);
router.use('/publication', publicationroutes);
router.use('/availability', availabilityRoutes);
router.use('/calendar', calendarRoutes);
router.use('/documents', documentRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/notifications', notificationRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/audit-logs', auditLogRoutes);
router.use('/whatsapp', whatsappRoutes);
router.use('/media', mediaRoutes);
router.use('/promotions', promotionRoutes);
router.use('/contracts', contractRoutes);
router.use('/amenities', amenityRoutes);
router.use('/rooms', roomRoutes);
router.use('/offices', officeRoutes);
router.use('/apartments', apartmentRoutes);

// Route pour le formulaire de contact
router.use('/contact', contractRoutes); // ✅ Route disponible sur POST /api/v1/contact

export default router;