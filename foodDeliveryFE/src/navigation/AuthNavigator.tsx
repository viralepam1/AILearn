import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from '@/components/atoms/Text';
import { ScreenTemplate } from '@/components/templates/ScreenTemplate';
import { LoginScreen } from '@/screens/login/LoginScreen';
import { SignUpScreen } from '@/screens/signUp/SignUpScreen';
import { LocationPermissionScreen } from '@/screens/locationPermission/LocationPermissionScreen';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

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
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordPlaceholder}
      />
      <Stack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      />
    </Stack.Navigator>
  );
};
