import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { useSplashScreen } from './hooks/useSplashScreen';
import { COLORS } from '@/theme/colors';
import { dfoodLogoXml } from '@/assets/logos/dfood-logo';

const styles = StyleSheet.create({
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

export const SplashScreen: React.FC = () => {
  const { fadeAnim, scaleAnim, showLoadingIndicator, spinAnim } =
    useSplashScreen();
  const insets = useSafeAreaInsets();

  const animatedLogoStyle = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };
  const spinInterpolation = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedSpinnerStyle = {
    transform: [{ rotate: spinInterpolation }],
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.contentWrapper}>
        <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
          <SvgXml xml={dfoodLogoXml} width={121.125} height={58.882} />
        </Animated.View>

        {showLoadingIndicator && (
          <View style={styles.loadingIndicatorContainer}>
            <Animated.View style={[styles.spinner, animatedSpinnerStyle]} />
          </View>
        )}
      </View>
    </View>
  );
};
