import { StyleSheet } from 'react-native';
import { SPACING } from '@/theme';

export const styles = StyleSheet.create({
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
