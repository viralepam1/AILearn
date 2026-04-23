import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormValidation, useToast } from '@/hooks';
import { emailRules, nameRules, signUpPasswordRules } from '@/utils/validation';
import type { FormErrors } from '@/types';
import type { AuthStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store';
import { HttpError } from '@/api/client';

type SignUpNavigation = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

const SIGN_UP_FIELDS = {
  name: { rules: nameRules },
  email: { rules: emailRules },
  password: { rules: signUpPasswordRules },
} as const;

export interface UseSignUpReturn {
  // State
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isPasswordVisible: boolean;
  isConfirmPasswordVisible: boolean;
  isLoading: boolean;
  errors: FormErrors;
  isFormValid: boolean;
  toastMessage: string;
  isToastVisible: boolean;
  // Handlers
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onNameBlur: () => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onConfirmPasswordBlur: () => void;
  onTogglePasswordVisibility: () => void;
  onToggleConfirmPasswordVisibility: () => void;
  onSignUp: () => void;
  onLogIn: () => void;
  onBack: () => void;
}

export const useSignUp = (): UseSignUpReturn => {
  const navigation = useNavigation<SignUpNavigation>();
  const signUpAction = useAuthStore(state => state.signUp);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toast
  const { toastMessage, isToastVisible, showToast } = useToast();

  // Track which fields the user has already blurred (touched)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >();
  // Server-side email error (409 duplicate)
  const [serverEmailError, setServerEmailError] = useState<
    string | undefined
  >();

  const {
    errors: fieldErrors,
    validateField,
    clearFieldError,
  } = useFormValidation(SIGN_UP_FIELDS);

  // Merge field errors with confirmPassword + server email errors
  const errors: FormErrors = useMemo(
    () => ({
      ...fieldErrors,
      confirmPassword: confirmPasswordError,
      email: fieldErrors.email ?? serverEmailError,
    }),
    [fieldErrors, confirmPasswordError, serverEmailError],
  );

  // All fields filled + no active errors
  const isFormValid = useMemo(() => {
    const allFilled =
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0;
    const noErrors =
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword;
    return allFilled && noErrors;
  }, [name, email, password, confirmPassword, errors]);

  const validateConfirmPassword = useCallback(
    (value: string, currentPassword: string): boolean => {
      if (!value) {
        setConfirmPasswordError('Please re-enter your password');
        return false;
      }
      if (value !== currentPassword) {
        setConfirmPasswordError('Passwords do not match');
        return false;
      }
      setConfirmPasswordError(undefined);
      return true;
    },
    [],
  );

  // onChange: re-validate immediately if field has already been blurred
  const onNameChange = useCallback(
    (value: string) => {
      setName(value);
      if (touched.name) {
        validateField('name', value);
      } else {
        clearFieldError('name');
      }
    },
    [touched.name, validateField, clearFieldError],
  );

  const onEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      setServerEmailError(undefined);
      if (touched.email) {
        validateField('email', value);
      } else {
        clearFieldError('email');
      }
    },
    [touched.email, validateField, clearFieldError],
  );

  const onPasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      if (touched.password) {
        validateField('password', value);
      } else {
        clearFieldError('password');
      }
      // Always re-validate confirmPassword if it has been touched
      if (touched.confirmPassword) {
        validateConfirmPassword(confirmPassword, value);
      }
    },
    [
      touched.password,
      touched.confirmPassword,
      validateField,
      clearFieldError,
      confirmPassword,
      validateConfirmPassword,
    ],
  );

  const onConfirmPasswordChange = useCallback(
    (value: string) => {
      setConfirmPassword(value);
      if (touched.confirmPassword) {
        validateConfirmPassword(value, password);
      } else {
        setConfirmPasswordError(undefined);
      }
    },
    [touched.confirmPassword, password, validateConfirmPassword],
  );

  // onBlur: mark touched and run validation
  const onNameBlur = useCallback(() => {
    setTouched(prev => ({ ...prev, name: true }));
    validateField('name', name);
  }, [validateField, name]);

  const onEmailBlur = useCallback(() => {
    setTouched(prev => ({ ...prev, email: true }));
    validateField('email', email);
  }, [validateField, email]);

  const onPasswordBlur = useCallback(() => {
    setTouched(prev => ({ ...prev, password: true }));
    validateField('password', password);
  }, [validateField, password]);

  const onConfirmPasswordBlur = useCallback(() => {
    setTouched(prev => ({ ...prev, confirmPassword: true }));
    validateConfirmPassword(confirmPassword, password);
  }, [confirmPassword, password, validateConfirmPassword]);

  const onTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  const onToggleConfirmPasswordVisibility = useCallback(() => {
    setIsConfirmPasswordVisible(prev => !prev);
  }, []);

  // FDA-12: API integration
  const onSignUp = useCallback(async () => {
    setIsLoading(true);
    try {
      await signUpAction({ name, email, password });

      // Success: navigate to LocationPermission, replacing SignUp from the stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'LocationPermission' }],
      });
    } catch (error) {
      setIsLoading(false);

      if (error instanceof HttpError) {
        if (error.status === 409) {
          setServerEmailError('An account with this email already exists');
          return;
        }
        if (error.status === 400) {
          showToast('Invalid input. Please check your details.');
          return;
        }
      }
      // 500 / network error
      showToast('Something went wrong. Please try again.');
    }
  }, [signUpAction, name, email, password, navigation]);

  const onLogIn = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    name,
    email,
    password,
    confirmPassword,
    isPasswordVisible,
    isConfirmPasswordVisible,
    isLoading,
    errors,
    isFormValid,
    toastMessage,
    isToastVisible,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onNameBlur,
    onEmailBlur,
    onPasswordBlur,
    onConfirmPasswordBlur,
    onTogglePasswordVisibility,
    onToggleConfirmPasswordVisibility,
    onSignUp,
    onLogIn,
    onBack,
  };
};
