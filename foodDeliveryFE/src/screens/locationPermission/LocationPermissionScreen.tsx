import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { COLORS } from '@/theme';
import { useLocationPermission } from './hooks/useLocationPermission';
import { styles } from './styles';

// FDA-5: LocationPermission screen — full implementation in a future story
export const LocationPermissionScreen: React.FC = () => {
  useLocationPermission();

  return (
    <View style={styles.container}>
      <Text variant="h2" style={styles.text}>
        Location Access
      </Text>
      <Text variant="body" color={COLORS.textSecondary}>
        Coming soon…
      </Text>
    </View>
  );
};
