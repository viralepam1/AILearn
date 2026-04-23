import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: '@user',
  REMEMBERED_EMAIL: '@remembered_email',
  IS_FIRST_LAUNCH: '@is_first_launch',
} as const;

export const storage = {
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
    await AsyncStorage.removeItem(KEYS.USER);
  },
} as const;
