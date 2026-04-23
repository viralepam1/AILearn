import React from 'react';
import { View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { useSplashScreen } from './hooks/useSplashScreen';
import { dfoodLogoXml } from '@/assets/logos/dfood-logo';
import { styles } from './styles';

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
