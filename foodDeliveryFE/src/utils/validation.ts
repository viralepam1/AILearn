const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UPPERCASE_REGEX = /[A-Z]/;
const DIGIT_REGEX = /\d/;
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

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

export const nameRules: readonly ValidationRule[] = [
  { validate: isNonEmpty, message: 'Full name is required' },
  {
    validate: v => v.trim().length >= 2,
    message: 'Name must be at least 2 characters',
  },
  {
    validate: v => v.trim().length <= 50,
    message: 'Name must not exceed 50 characters',
  },
];

export const emailRules: readonly ValidationRule[] = [
  { validate: isNonEmpty, message: 'Email is required' },
  { validate: isValidEmail, message: 'Please enter a valid email address' },
];

export const passwordRules: readonly ValidationRule[] = [
  { validate: isNonEmpty, message: 'Password is required' },
];

export const signUpPasswordRules: readonly ValidationRule[] = [
  { validate: isNonEmpty, message: 'Password is required' },
  {
    validate: v => v.length >= 8,
    message: 'Password must be at least 8 characters',
  },
  {
    validate: v => UPPERCASE_REGEX.test(v),
    message: 'Password must contain at least 1 uppercase letter',
  },
  {
    validate: v => DIGIT_REGEX.test(v),
    message: 'Password must contain at least 1 number',
  },
  {
    validate: v => SPECIAL_CHAR_REGEX.test(v),
    message: 'Password must contain at least 1 special character',
  },
];
