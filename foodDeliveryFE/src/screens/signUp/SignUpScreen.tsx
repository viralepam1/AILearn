import React from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Button, Icon, Toast } from '@/components/atoms';
import { FormField, PasswordInput } from '@/components/molecules';
import { COLORS } from '@/theme';
import { useSignUp } from './hooks/useSignUp';
import { styles } from './styles';

export const SignUpScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {
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
  } = useSignUp();

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        pointerEvents={isLoading ? 'none' : 'auto'}
      >
        {/* Header — dark background */}
        <View style={[styles.headerSection, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Icon name="arrow-left" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Please sign up to get started</Text>
        </View>

        {/* White card */}
        <View
          style={[
            styles.card,
            { paddingBottom: insets.bottom + 24 },
            isLoading && styles.cardLoading,
          ]}
        >
          <FormField
            label="NAME"
            value={name}
            onChangeText={onNameChange}
            onBlur={onNameBlur}
            error={errors.name}
            placeholder="John Doe"
            autoCapitalize="words"
            autoComplete="name"
            accessibilityLabel="Full name"
          />

          <FormField
            label="EMAIL"
            value={email}
            onChangeText={onEmailChange}
            onBlur={onEmailBlur}
            error={errors.email}
            placeholder="example@gmail.com"
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
            placeholder="Min 8 characters"
            accessibilityLabel="Password"
          />

          <PasswordInput
            label="RE-TYPE PASSWORD"
            value={confirmPassword}
            onChangeText={onConfirmPasswordChange}
            onBlur={onConfirmPasswordBlur}
            isPasswordVisible={isConfirmPasswordVisible}
            onToggleVisibility={onToggleConfirmPasswordVisibility}
            error={errors.confirmPassword}
            placeholder="Re-enter your password"
            accessibilityLabel="Confirm password"
          />

          <Button
            title="SIGN UP"
            onPress={onSignUp}
            disabled={!isFormValid}
            loading={isLoading}
            accessibilityLabel="Sign up"
          />

          <View style={styles.footerContainer}>
            <Text variant="caption" color={COLORS.textSecondary}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={onLogIn}
              accessibilityLabel="Navigate to log in"
              accessibilityRole="link"
            >
              <Text
                variant="caption"
                color={COLORS.primary}
                style={styles.loginLink}
              >
                LOG IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast message={toastMessage} visible={isToastVisible} />
    </KeyboardAvoidingView>
  );
};
