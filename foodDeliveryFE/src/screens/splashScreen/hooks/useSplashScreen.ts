import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export interface UseSplashScreenReturn {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  showLoadingIndicator: boolean;
  spinAnim: Animated.Value;
}

const SPLASH_MIN_DURATION = 2000; // Show splash for minimum 2 seconds
const LOADING_INDICATOR_DELAY = 2000; // Show loading indicator after 2 seconds
const MAX_SPLASH_DURATION = 5000; // Maximum 5 seconds on splash screen

export const useSplashScreen = (): UseSplashScreenReturn => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Phase 1: Fade-in animation over 800ms
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Phase 2: Scale pulse animation (2-3 seconds total)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Phase 3: Continuous spin animation for loading indicator (smooth infinite rotation)
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true },
    ).start();

    // Show loading indicator after LOADING_INDICATOR_DELAY (2 seconds)
    const loadingTimer = setTimeout(() => {
      setShowLoadingIndicator(true);
    }, LOADING_INDICATOR_DELAY);

    // Force dismiss after MAX_SPLASH_DURATION (5 seconds)
    const maxTimer = setTimeout(() => {
      setShowLoadingIndicator(false);
    }, MAX_SPLASH_DURATION);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  return { fadeAnim, scaleAnim, showLoadingIndicator, spinAnim };
};
