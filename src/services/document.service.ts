
import { generatePDF } from '../utils/pdfGenerator';

import { bookingRepository } from '../repositories/booking.repository';
import { paymentRepository } from '../repositories/payment.repository';
import { contractRepository } from '../repositories/contract.repository';

export const documentService = {
  async generateInvoice(bookingId: string) {
    const booking = await bookingRepository.findById(bookingId);

    if (!booking) {
      throw new Error('Reservation non trouvee');
    }

    return generatePDF('invoice', {
      booking,
      date: new Date(),
    });
  },

  async generateReceipt(paymentId: string) {
    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new Error('Paiement non trouve');
    }

    return generatePDF('receipt', {
      payment,
      date: new Date(),
    });
  },

  async generateContract(contractId: string) {
    const contract = await contractRepository.findById(contractId);

    if (!contract) {
      throw new Error('Contrat non trouve');
    }

    return generatePDF('leaseContract', {
      contract,
      date: new Date(),
    });
  },
};

