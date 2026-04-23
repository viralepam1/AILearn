import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { COLORS } from '@/theme/colors';
import { SPACING } from '@/theme/spacing';

export interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
  accessibilityLabel: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  accessibilityLabel,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && (
          <Text color={COLORS.white} style={styles.checkmark}>
            ✓
          </Text>
        )}
      </View>
      {label && (
        <Text variant="caption" style={styles.label}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    fontSize: 12,
    lineHeight: 14,
  },
  label: {
    marginLeft: SPACING.sm,
  },
});
