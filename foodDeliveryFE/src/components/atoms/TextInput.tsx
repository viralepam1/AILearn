import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { COLORS } from '@/theme/colors';
import { SPACING } from '@/theme/spacing';
import { TYPOGRAPHY } from '@/theme/typography';

export interface TextInputProps extends RNTextInputProps {
  hasError?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  hasError = false,
  style,
  ...rest
}) => {
  return (
    <RNTextInput
      style={[styles.input, hasError && styles.inputError, style]}
      placeholderTextColor={COLORS.textPlaceholder}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.lg,
    fontSize: TYPOGRAPHY.body.fontSize,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.error,
  },
});
