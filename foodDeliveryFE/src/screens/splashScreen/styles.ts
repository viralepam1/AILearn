import { StyleSheet } from 'react-native';
import { COLORS } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 121.125,
    height: 58.882,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicatorContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  spinner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: COLORS.border,
    borderTopColor: COLORS.primary,
  },
});
