import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { COLORS } from '@/theme/colors';

// FDA-5: LocationPermission screen — full implementation in a future story
export const LocationPermissionScreen: React.FC = () => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    marginBottom: 8,
  },
});
