import type { LoginResponse } from '@/types';

const MOCK_EMAIL = 'test@example.com';
const MOCK_PASSWORD = 'password123';

const MOCK_LOGIN_RESPONSE: LoginResponse = {
  userId: 'user_001',
  token: 'mock_jwt_token_abc123',
  refreshToken: 'mock_refresh_token_xyz789',
  user: {
    id: 'user_001',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91 98765 43210',
    avatar: null,
  },
};

export const authMocks = {
  login(email: string, password: string): LoginResponse {
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      return MOCK_LOGIN_RESPONSE;
    }
    throw new Error('Invalid email or password');
  },
} as const;
