import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenTemplate } from '@/components/templates/ScreenTemplate';
import { Text } from '@/components/atoms/Text';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const DashboardPlaceholder: React.FC = () => (
  <ScreenTemplate>
    <Text variant="h2">Dashboard</Text>
    <Text variant="body">Coming soon...</Text>
  </ScreenTemplate>
);

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Dashboard"
    >
      <Stack.Screen name="Dashboard" component={DashboardPlaceholder} />
    </Stack.Navigator>
  );
};
