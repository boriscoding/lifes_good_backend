import validator from 'validator';

export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const isValidPhoneCM = (phone: string): boolean => {
  // Cameroun : +237 6XX XXX XXX
  const cmRegex = /^(\+237|237)?[6|2|3][0-9]{8}$/;
  return cmRegex.test(phone.replace(/\s/g, ''));
};

export const sanitizeInput = (input: string): string => {
  return validator.escape(validator.trim(input));
};