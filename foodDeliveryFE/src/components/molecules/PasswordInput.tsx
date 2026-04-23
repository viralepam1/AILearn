import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { TextInput } from '@/components/atoms/TextInput';
import { Icon } from '@/components/atoms/Icon';
import { COLORS } from '@/theme/colors';
import { SPACING } from '@/theme/spacing';

export interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  isPasswordVisible: boolean;
  onToggleVisibility: () => void;
  error?: string;
  placeholder?: string;
  accessibilityLabel: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  isPasswordVisible,
  onToggleVisibility,
  error,
  placeholder,
  accessibilityLabel,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" style={styles.label}>
        {label}
      </Text>
      <View style={[styles.inputRow, error ? styles.inputRowError : undefined]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={!isPasswordVisible}
          placeholder={placeholder}
          style={styles.input}
          accessibilityLabel={accessibilityLabel}
        />
        <Icon
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          onPress={onToggleVisibility}
          accessibilityLabel={
            isPasswordVisible ? 'Hide password' : 'Show password'
          }
          style={styles.icon}
        />
      </View>
      {error && (
        <Text variant="small" color={COLORS.error} style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    marginBottom: SPACING.xs,
    color: COLORS.textSecondary,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  inputRowError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    borderWidth: 0,
  },
  icon: {
    paddingHorizontal: SPACING.md,
  },
  error: {
    marginTop: SPACING.xs,
  },
});
