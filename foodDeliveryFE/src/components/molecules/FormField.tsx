import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { TextInput, type TextInputProps } from '@/components/atoms/TextInput';
import { COLORS } from '@/theme/colors';
import { SPACING } from '@/theme/spacing';

export interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  ...inputProps
}) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" style={styles.label}>
        {label}
      </Text>
      <TextInput hasError={!!error} {...inputProps} />
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
  error: {
    marginTop: SPACING.xs,
  },
});
