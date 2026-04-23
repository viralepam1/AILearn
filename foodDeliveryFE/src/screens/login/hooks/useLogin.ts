import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '@/store';
import { useFormValidation } from '@/hooks';
import { emailRules, passwordRules } from '@/utils/validation';
import { storage } from '@/utils/storage';
import type { FormErrors } from '@/types';
import type { AuthStackParamList } from '@/navigation/types';

type LoginNavigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LOGIN_FIELDS = {
  email: { rules: emailRules },
  password: { rules: passwordRules },
} as const;

export interface UseLoginReturn {
  email: string;
  password: string;
  isPasswordVisible: boolean;
  rememberMe: boolean;
  isLoading: boolean;
  errors: FormErrors;
  loginError: string | null;
  isFormValid: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onTogglePasswordVisibility: () => void;
  onToggleRememberMe: () => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const navigation = useNavigation<LoginNavigation>();
  const login = useAuthStore(state => state.login);
  const isLoading = useAuthStore(state => state.isLoading);
  const loginError = useAuthStore(state => state.error);
  const clearError = useAuthStore(state => state.clearError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { errors, validateField, validateAll, clearFieldError } =
    useFormValidation(LOGIN_FIELDS);

  useEffect(() => {
    const loadRememberedEmail = async () => {
      const remembered = await storage.getRememberedEmail();
      if (remembered) {
        setEmail(remembered);
        setRememberMe(true);
      }
    };
    loadRememberedEmail();
  }, []);

  const isFormValid = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0;
  }, [email, password]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      clearFieldError('email');
      clearError();
    },
    [clearFieldError, clearError],
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value);
      clearFieldError('password');
      clearError();
    },
    [clearFieldError, clearError],
  );

  const handleEmailBlur = useCallback(() => {
    validateField('email', email);
  }, [validateField, email]);

  const handlePasswordBlur = useCallback(() => {
    validateField('password', password);
  }, [validateField, password]);

  const handleTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  const handleToggleRememberMe = useCallback(() => {
    setRememberMe(prev => !prev);
  }, []);

  const handleLogin = useCallback(async () => {
    const isValid = validateAll({ email, password });
    if (!isValid) {
      return;
    }

    await login(email, password);

    if (rememberMe) {
      await storage.setRememberedEmail(email);
    } else {
      await storage.removeRememberedEmail();
    }
  }, [email, password, rememberMe, validateAll, login]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  const handleSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return {
    email,
    password,
    isPasswordVisible,
    rememberMe,
    isLoading,
    errors,
    loginError,
    isFormValid,
    onEmailChange: handleEmailChange,
    onPasswordChange: handlePasswordChange,
    onEmailBlur: handleEmailBlur,
    onPasswordBlur: handlePasswordBlur,
    onTogglePasswordVisibility: handleTogglePasswordVisibility,
    onToggleRememberMe: handleToggleRememberMe,
    onLogin: handleLogin,
    onForgotPassword: handleForgotPassword,
    onSignUp: handleSignUp,
  };
};
