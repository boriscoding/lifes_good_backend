export enum AggregatorPaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export const mapAggregatorStatus = (
  provider: string,
  rawStatus: string
): AggregatorPaymentStatus => {
  const statusMap: Record<string, Record<string, AggregatorPaymentStatus>> = {
    paydunya: {
      pending: AggregatorPaymentStatus.PENDING,
      completed: AggregatorPaymentStatus.SUCCESS,
      cancelled: AggregatorPaymentStatus.CANCELLED,
      failed: AggregatorPaymentStatus.FAILED,
    },
    cinetpay: {
      PENDING: AggregatorPaymentStatus.PENDING,
      ACCEPTED: AggregatorPaymentStatus.SUCCESS,
      REFUSED: AggregatorPaymentStatus.FAILED,
      CANCELLED: AggregatorPaymentStatus.CANCELLED,
    },
    opay: {
      INITIAL: AggregatorPaymentStatus.PENDING,
      PENDING: AggregatorPaymentStatus.PROCESSING,
      SUCCESS: AggregatorPaymentStatus.SUCCESS,
      FAIL: AggregatorPaymentStatus.FAILED,
      CLOSED: AggregatorPaymentStatus.CANCELLED,
    },
  };

  const providerMap = statusMap[provider.toLowerCase()] || {};
  return providerMap[rawStatus] || AggregatorPaymentStatus.PENDING;
};