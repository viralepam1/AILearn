import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  AUTH_TOKEN: '@auth_token',
  REFRESH_TOKEN: '@refresh_token',
  USER: '@user',
  REMEMBERED_EMAIL: '@remembered_email',
  IS_FIRST_LAUNCH: '@is_first_launch',
} as const;

export const storage = {
  async getAuthToken(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.AUTH_TOKEN);
  },

  async setAuthToken(token: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.AUTH_TOKEN, token);
  },

  async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.REFRESH_TOKEN);
  },

  async setRefreshToken(token: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.REFRESH_TOKEN, token);
  },

  async getUser(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.USER);
  },

  async setUser(user: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER, user);
  },

  async getRememberedEmail(): Promise<string | null> {
    return AsyncStorage.getItem(KEYS.REMEMBERED_EMAIL);
  },

  async setRememberedEmail(email: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.REMEMBERED_EMAIL, email);
  },

  async removeRememberedEmail(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.REMEMBERED_EMAIL);
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.AUTH_TOKEN);
    await AsyncStorage.removeItem(KEYS.REFRESH_TOKEN);
    await AsyncStorage.removeItem(KEYS.USER);
  },
} as const;
