/**
 * Génère une référence unique pour les réservations
 * Format: BK-20260101-ABC123
 * 
 * @param prefix - Préfixe de la référence (ex: BK, PAY, INV)
 * @returns Réference unique formatée
 * 
 * @example
 * generateReference('BK') // "BK-20260101-A7B3X9"
 * generateReference('PAY') // "PAY-20260101-ZK4M2P"
 */
export const generateReference = (prefix: string = 'BK'): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  
  // Générer 6 caractères aléatoires (A-Z, 0-9)
  const random = Math.random()
    .toString(36)                   
    .substring(2, 8)                
    .toUpperCase();                  
  
  return `${prefix}-${dateStr}-${random}`;
};

/**
 * Génère une référence courte pour les confirmations WhatsApp
 * Format: A7B3X9 (6 caractères)
 * 
 * @returns Réference courte de 6 caractères
 * 
 * @example
 * generateShortReference() // "A7B3X9"
 * generateShortReference() // "ZK4M2P"
 */
export const generateShortReference = (): string => {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
};

/**
 * Génère un code de confirmation numérique
 * Format: 123456 (6 chiffres)
 * 
 * @param length - Nombre de chiffres (défaut: 6)
 * @returns Code numérique
 * 
 * @example
 * generateNumericCode() // "483729"
 * generateNumericCode(4) // "5921"
 */
export const generateNumericCode = (length: number = 6): string => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

/**
 * Génère une référence de paiement
 * Format: PAY-20260101-A7B3X9
 * 
 * @returns Réference de paiement
 */
export const generatePaymentReference = (): string => {
  return generateReference('PAY');
};

/**
 * Génère une référence de facture
 * Format: INV-20260101-A7B3X9
 * 
 * @returns Réference de facture
 */
export const generateInvoiceReference = (): string => {
  return generateReference('INV');
};

/**
 * Génère une référence de contrat
 * Format: CT-20260101-A7B3X9
 * 
 * @returns Réference de contrat
 */
export const generateContractReference = (): string => {
  return generateReference('CT');
};

/**
 * Génère un ID de réservation formaté pour l'affichage client
 * Format: RES-2026-000125
 * 
 * @param id - 
 * @returns 
 */
export const generateBookingId = (id: number | string): string => {
  const year = new Date().getFullYear();
  const paddedId = String(id).padStart(6, '0');
  return `RES-${year}-${paddedId}`;
};

export default {
  generateReference,
  generateShortReference,
  generateNumericCode,
  generatePaymentReference,
  generateInvoiceReference,
  generateContractReference,
  generateBookingId,
};