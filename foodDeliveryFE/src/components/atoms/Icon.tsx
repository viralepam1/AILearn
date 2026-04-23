import React from 'react';
import { TouchableOpacity, StyleSheet, type ViewStyle } from 'react-native';
import { Text } from './Text';
import { COLORS } from '@/theme/colors';

export interface IconProps {
  name: 'eye' | 'eye-off' | 'arrow-left' | 'check';
  size?: number;
  color?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

const ICON_MAP: Record<IconProps['name'], string> = {
  eye: '👁',
  'eye-off': '🙈',
  'arrow-left': '←',
  check: '✓',
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = COLORS.textSecondary,
  onPress,
  accessibilityLabel,
  style,
}) => {
  const icon = (
    <Text style={[styles.icon, { fontSize: size, color }]}>
      {ICON_MAP[name]}
    </Text>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.touchable, style]}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {icon}
      </TouchableOpacity>
    );
  }

  return icon;
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
