declare const __DEV__: boolean;

export const API_CONFIG = {
  BASE_URL: __DEV__
    ? 'http://localhost:3000/api'
    : 'https://api.fooddelivery.com/api',
  USE_MOCK: true,
  TIMEOUT: 10000,
} as const;
