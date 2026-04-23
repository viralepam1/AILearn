const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const isNonEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

export const emailRules: readonly ValidationRule[] = [
  { validate: isNonEmpty, message: 'Email is required' },
  { validate: isValidEmail, message: 'Please enter a valid email address' },
];

export const passwordRules: readonly ValidationRule[] = [
  { validate: isNonEmpty, message: 'Password is required' },
];
