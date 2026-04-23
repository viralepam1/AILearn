import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenTemplate } from '@/components/templates/ScreenTemplate';
import { Text, Button, Checkbox } from '@/components/atoms';
import { FormField, PasswordInput } from '@/components/molecules';
import { COLORS } from '@/theme/colors';
import { SPACING } from '@/theme/spacing';
import { useLogin } from './hooks/useLogin';

export const LoginScreen: React.FC = () => {
  const {
    email,
    password,
    isPasswordVisible,
    rememberMe,
    isLoading,
    errors,
    loginError,
    isFormValid,
    onEmailChange,
    onPasswordChange,
    onEmailBlur,
    onPasswordBlur,
    onTogglePasswordVisibility,
    onToggleRememberMe,
    onLogin,
    onForgotPassword,
    onSignUp,
  } = useLogin();

  return (
    <ScreenTemplate>
      <View style={styles.header}>
        <Text variant="h1">Log In</Text>
        <Text
          variant="body"
          color={COLORS.textSecondary}
          style={styles.subtitle}
        >
          Please sign in to your existing account
        </Text>
      </View>

      {loginError && (
        <View style={styles.errorBanner}>
          <Text variant="caption" color={COLORS.error}>
            {loginError}
          </Text>
        </View>
      )}

      <View style={styles.form}>
        <FormField
          label="EMAIL"
          value={email}
          onChangeText={onEmailChange}
          onBlur={onEmailBlur}
          error={errors.email}
          placeholder="example@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          accessibilityLabel="Email address"
        />

        <PasswordInput
          label="PASSWORD"
          value={password}
          onChangeText={onPasswordChange}
          onBlur={onPasswordBlur}
          isPasswordVisible={isPasswordVisible}
          onToggleVisibility={onTogglePasswordVisibility}
          error={errors.password}
          placeholder="Enter your password"
          accessibilityLabel="Password"
        />

        <View style={styles.row}>
          <Checkbox
            checked={rememberMe}
            onToggle={onToggleRememberMe}
            label="Remember me"
            accessibilityLabel="Remember me checkbox"
          />
          <TouchableOpacity
            onPress={onForgotPassword}
            accessibilityLabel="Forgot password"
            accessibilityRole="link"
          >
            <Text variant="caption" color={COLORS.primary}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          title="LOG IN"
          onPress={onLogin}
          disabled={!isFormValid}
          loading={isLoading}
          accessibilityLabel="Log in button"
        />
      </View>

      <View style={styles.footer}>
        <Text variant="caption" color={COLORS.textSecondary}>
          {"Don't have an account? "}
        </Text>
        <TouchableOpacity
          onPress={onSignUp}
          accessibilityLabel="Sign up"
          accessibilityRole="link"
        >
          <Text variant="caption" color={COLORS.primary}>
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: SPACING.xxxl,
    marginBottom: SPACING.xxl,
  },
  subtitle: {
    marginTop: SPACING.sm,
  },
  errorBanner: {
    backgroundColor: '#FDEDEC',
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.lg,
  },
  form: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
});
