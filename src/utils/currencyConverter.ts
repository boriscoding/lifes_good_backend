const RATES: Record<string, number> = {
  XAF: 1,
  EUR: 655.957,
  USD: 600, // Approximatif, a mettre a jour via API
};

export const convertToXAF = (amount: number, fromCurrency: string): number => {
  const rate = RATES[fromCurrency.toUpperCase()];
  if (!rate) throw new Error(`Devise non supportee : ${fromCurrency}`);
  return Math.round(amount * rate);
};