import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/theme';

const DARK_BACKGROUND = '#121223';

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: DARK_BACKGROUND,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerSection: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.white,
    opacity: 0.85,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
  },
  cardLoading: {
    opacity: 0.6,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  loginLink: {
    fontWeight: '700',
  },
});
