import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    marginBottom: SPACING.sm,
  },
});
