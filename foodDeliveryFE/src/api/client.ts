import { API_CONFIG } from '@/constants/apiConfig';
import { authMocks } from '@/api/mocks';
import { ENDPOINTS } from '@/api/endpoints';
import { storage } from '@/utils/storage';
import type { ApiResponse, RequestConfig } from '@/types';

interface ApiClient {
  get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  post<T>(
    endpoint: string,
    body: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>>;
  put<T>(
    endpoint: string,
    body: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>>;
}

const handleMockRequest = <T>(
  endpoint: string,
  body?: unknown,
): ApiResponse<T> => {
  if (endpoint === ENDPOINTS.AUTH.LOGIN) {
    const { email, password } = body as { email: string; password: string };
    const data = authMocks.login(email, password) as T;
    return { data, status: 200, message: 'Success' };
  }
  throw new Error(`No mock handler for endpoint: ${endpoint}`);
};

const buildHeaders = async (
  config?: RequestConfig,
): Promise<Record<string, string>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...config?.headers,
  };
  const token = await storage.getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async <T>(
  response: Response,
): Promise<ApiResponse<T>> => {
  const json: unknown = await response.json();

  if (!response.ok) {
    const errorBody = json as { message?: string };
    throw new Error(errorBody.message ?? `HTTP error ${response.status}`);
  }

  return json as ApiResponse<T>;
};

const request = async <T>(
  method: string,
  endpoint: string,
  body?: unknown,
  config?: RequestConfig,
): Promise<ApiResponse<T>> => {
  if (API_CONFIG.USE_MOCK) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(handleMockRequest<T>(endpoint, body));
        } catch (error) {
          reject(error);
        }
      }, 800);
    });
  }

  const headers = await buildHeaders(config);
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    config?.timeout ?? API_CONFIG.TIMEOUT,
  );

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    return handleResponse<T>(response);
  } finally {
    clearTimeout(timeout);
  }
};

export const apiClient: ApiClient = {
  get<T>(endpoint: string, config?: RequestConfig) {
    return request<T>('GET', endpoint, undefined, config);
  },
  post<T>(endpoint: string, body: unknown, config?: RequestConfig) {
    return request<T>('POST', endpoint, body, config);
  },
  put<T>(endpoint: string, body: unknown, config?: RequestConfig) {
    return request<T>('PUT', endpoint, body, config);
  },
  delete<T>(endpoint: string, config?: RequestConfig) {
    return request<T>('DELETE', endpoint, undefined, config);
  },
};
