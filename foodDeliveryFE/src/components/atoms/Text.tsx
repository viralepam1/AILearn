import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';
import { COLORS } from '@/theme/colors';
import { TYPOGRAPHY } from '@/theme/typography';

export interface TextProps extends RNTextProps {
  variant?: keyof typeof TYPOGRAPHY;
  color?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...rest
}) => {
  const typographyStyle = TYPOGRAPHY[variant] as TextStyle;

  return (
    <RNText
      style={[
        styles.base,
        typographyStyle,
        color ? { color } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: COLORS.textPrimary,
  },
});
