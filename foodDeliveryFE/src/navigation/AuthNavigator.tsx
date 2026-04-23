import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from '@/components/atoms/Text';
import { ScreenTemplate } from '@/components/templates/ScreenTemplate';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const SignUpPlaceholder: React.FC = () => (
  <ScreenTemplate>
    <Text variant="h2">Sign Up</Text>
    <Text variant="body">Coming soon...</Text>
  </ScreenTemplate>
);

const ForgotPasswordPlaceholder: React.FC = () => (
  <ScreenTemplate>
    <Text variant="h2">Forgot Password</Text>
    <Text variant="body">Coming soon...</Text>
  </ScreenTemplate>
);

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignUp"
    >
      <Stack.Screen name="SignUp" component={SignUpPlaceholder} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordPlaceholder}
      />
    </Stack.Navigator>
  );
};
