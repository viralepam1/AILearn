import { create } from 'zustand';
import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { storage } from '@/utils/storage';
import { secureStorage } from '@/utils/secureStorage';
import type {
  User,
  LoginResponse,
  SignUpResponse,
  SignUpRequest,
} from '@/types';

interface AuthStoreState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (req: SignUpRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStoreState>(set => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<LoginResponse>(
        ENDPOINTS.AUTH.LOGIN,
        { email, password },
      );
      const { token, refreshToken, user } = response.data;

      await secureStorage.setAuthToken(token);
      await secureStorage.setRefreshToken(refreshToken);
      await storage.setUser(JSON.stringify(user));

      set({
        user,
        token,
        refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      set({ isLoading: false, error: message });
    }
  },

  signUp: async (req: SignUpRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post<SignUpResponse>(
        ENDPOINTS.AUTH.SIGNUP,
        req,
      );
      const { token, refreshToken, user } = response.data;

      await secureStorage.setAuthToken(token);
      await secureStorage.setRefreshToken(refreshToken);
      await storage.setUser(JSON.stringify(user));

      set({
        user,
        token,
        refreshToken,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign up failed',
      });
      throw error; // re-throw so useSignUp hook can handle specific cases
    }
  },

  logout: () => {
    secureStorage.clearTokens();
    storage.clearAll();
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },

  setUser: (user: User) => {
    set({ user });
  },
}));
