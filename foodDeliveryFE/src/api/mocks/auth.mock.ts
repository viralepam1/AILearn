import type { LoginResponse, SignUpResponse } from '@/types';
import { HttpError } from '@/api/client';

const MOCK_EMAIL = 'test@example.com';
const MOCK_PASSWORD = 'password123';
const DUPLICATE_EMAIL = 'duplicate@example.com';

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

  signUp(name: string, email: string, _password: string): SignUpResponse {
    if (email === DUPLICATE_EMAIL) {
      throw new HttpError(409, 'An account with this email already exists');
    }
    return {
      userId: 'user_002',
      token: 'mock_jwt_signup_token_def456',
      refreshToken: 'mock_refresh_signup_token_uvw123',
      user: {
        id: 'user_002',
        name,
        email,
        phone: '',
        avatar: null,
      },
    };
  },
} as const;
