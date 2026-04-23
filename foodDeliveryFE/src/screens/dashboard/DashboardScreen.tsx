import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenTemplate } from '@/components/templates/ScreenTemplate';
import { Text, Button } from '@/components/atoms';
import { useAuthStore } from '@/store';
import { SPACING } from '@/theme/spacing';

export const DashboardScreen: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  return (
    <ScreenTemplate scrollEnabled={false}>
      <View style={styles.container}>
        <Text variant="h1">Welcome, {user?.name ?? 'User'}!</Text>
        <Text variant="body" style={styles.subtitle}>
          Dashboard coming soon...
        </Text>
        <Button
          title="LOG OUT"
          onPress={logout}
          variant="outline"
          accessibilityLabel="Log out button"
        />
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  subtitle: {
    marginBottom: SPACING.xl,
  },
});
