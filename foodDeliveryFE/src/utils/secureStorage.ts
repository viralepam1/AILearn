/**
 * Secure token storage using react-native-keychain.
 * Tokens (JWT, refresh) are stored in the device keychain / Keystore
 * and never written to AsyncStorage.
 */
import * as Keychain from 'react-native-keychain';

const SERVICE_AUTH_TOKEN = 'com.fooddelivery.auth_token';
const SERVICE_REFRESH_TOKEN = 'com.fooddelivery.refresh_token';

export const secureStorage = {
  async getAuthToken(): Promise<string | null> {
    const result = await Keychain.getGenericPassword({
      service: SERVICE_AUTH_TOKEN,
    });
    return result ? result.password : null;
  },

  async setAuthToken(token: string): Promise<void> {
    await Keychain.setGenericPassword('auth', token, {
      service: SERVICE_AUTH_TOKEN,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  },

  async getRefreshToken(): Promise<string | null> {
    const result = await Keychain.getGenericPassword({
      service: SERVICE_REFRESH_TOKEN,
    });
    return result ? result.password : null;
  },

  async setRefreshToken(token: string): Promise<void> {
    await Keychain.setGenericPassword('refresh', token, {
      service: SERVICE_REFRESH_TOKEN,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  },

  async clearTokens(): Promise<void> {
    await Promise.all([
      Keychain.resetGenericPassword({ service: SERVICE_AUTH_TOKEN }),
      Keychain.resetGenericPassword({ service: SERVICE_REFRESH_TOKEN }),
    ]);
  },
} as const;
