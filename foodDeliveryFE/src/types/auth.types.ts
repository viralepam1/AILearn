export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  token: string;
  refreshToken: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

export type FormErrors = Record<string, string | undefined>;
