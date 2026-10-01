import dayjs from 'dayjs';

export interface CancellationPolicy {
  hoursBefore: number;
  refundPercentage: number;
}

export const calculateCancellationRefund = (
  checkInDate: Date,
  policies: CancellationPolicy[],
  totalAmount: number
): { refundAmount: number; penaltyAmount: number } => {
  const now = dayjs();
  const checkIn = dayjs(checkInDate);
  const hoursDiff = checkIn.diff(now, 'hour');

  // Trier par heures decroissantes
  const sortedPolicies = [...policies].sort((a, b) => b.hoursBefore - a.hoursBefore);

  for (const policy of sortedPolicies) {
    if (hoursDiff >= policy.hoursBefore) {
      const refundAmount = (totalAmount * policy.refundPercentage) / 100;
      return {
        refundAmount,
        penaltyAmount: totalAmount - refundAmount,
      };
    }
  }

  // Aucune policy applicable = 0% remboursement
  return { refundAmount: 0, penaltyAmount: totalAmount };
};