import { invoiceRepository, ListInvoicesOptions } from '../repositories/invoice.repository';
import { generateReference } from '../utils/generateReference';

export const invoiceService = {
  // Genere automatiquement une facture "issued" pour une reservation qui
  // vient d'etre creee. Appelee depuis bookingService.create() juste apres
  // la creation de la reservation. N'echoue jamais bruyamment : si la
  // generation de facture echoue, la reservation reste valide (voir le
  // try/catch cote booking.service.ts).
  async createForBooking(booking: { id: string; totalAmount: number | string }) {
    const invoiceNumber = generateReference('FAC');

    return invoiceRepository.create({
      bookingId: booking.id,
      invoiceNumber,
      amount: Number(booking.totalAmount),
      taxAmount: 0,
      totalAmount: Number(booking.totalAmount),
      status: 'issued',
      issuedAt: new Date(),
    });
  },

  async findById(id: string) {
    const invoice = await invoiceRepository.findById(id);

    if (!invoice) {
      throw new Error('Facture non trouvee');
    }

    return invoice;
  },

  async list(options?: ListInvoicesOptions) {
    return invoiceRepository.list(options);
  },

  // Reserve a un usage admin (webhook de paiement confirme / action manuelle) —
  // ne pas exposer directement a un client sur sa propre facture.
  async markPaid(id: string) {
    const invoice = await invoiceRepository.update(id, {
      status: 'paid',
      paidAt: new Date(),
    });

    if (!invoice) {
      throw new Error('Facture non trouvee');
    }

    return invoice;
  },

  async cancel(id: string) {
    const invoice = await invoiceRepository.update(id, { status: 'cancelled' });

    if (!invoice) {
      throw new Error('Facture non trouvee');
    }

    return invoice;
  },
};