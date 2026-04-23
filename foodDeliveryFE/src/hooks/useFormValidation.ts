import { useState, useCallback } from 'react';
import type { FormErrors } from '@/types';
import type { ValidationRule } from '@/utils/validation';

interface FieldConfig {
  rules: readonly ValidationRule[];
}

type FieldsConfig = Record<string, FieldConfig>;

interface UseFormValidationReturn<T extends FieldsConfig> {
  errors: FormErrors;
  validateField: (fieldName: keyof T, value: string) => boolean;
  validateAll: (values: Record<keyof T, string>) => boolean;
  clearFieldError: (fieldName: keyof T) => void;
  clearAllErrors: () => void;
}

export const useFormValidation = <T extends FieldsConfig>(
  fields: T,
): UseFormValidationReturn<T> => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback(
    (fieldName: keyof T, value: string): boolean => {
      const config = fields[fieldName];
      if (!config) {
        return true;
      }

      for (const rule of config.rules) {
        if (!rule.validate(value)) {
          setErrors(prev => ({ ...prev, [fieldName as string]: rule.message }));
          return false;
        }
      }

      setErrors(prev => ({ ...prev, [fieldName as string]: undefined }));
      return true;
    },
    [fields],
  );

  const validateAll = useCallback(
    (values: Record<keyof T, string>): boolean => {
      const newErrors: FormErrors = {};
      let isValid = true;

      for (const fieldName of Object.keys(fields)) {
        const config = fields[fieldName];
        const value = values[fieldName] ?? '';

        for (const rule of config.rules) {
          if (!rule.validate(value)) {
            newErrors[fieldName] = rule.message;
            isValid = false;
            break;
          }
        }
      }

      setErrors(newErrors);
      return isValid;
    },
    [fields],
  );

  const clearFieldError = useCallback((fieldName: keyof T) => {
    setErrors(prev => ({ ...prev, [fieldName as string]: undefined }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateAll,
    clearFieldError,
    clearAllErrors,
  };
};
