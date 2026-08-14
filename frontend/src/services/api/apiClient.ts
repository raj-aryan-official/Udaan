import { Platform } from 'react-native';

const getBaseUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  // Android emulator requires 10.0.2.2 to access host machine localhost
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000';
  }
  return 'http://localhost:5000';
};

export const API_BASE_URL = getBaseUrl();

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  accessToken = token;
};

export const getAuthToken = (): string | null => accessToken;

export const setRefreshToken = (token: string | null) => {
  refreshToken = token;
};

export const getRefreshToken = (): string | null => refreshToken;

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  [key: string]: any;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Request failed with status ${response.status}`,
        status: response.status,
        ...data,
      } as T;
    }

    return {
      success: true,
      ...data,
    } as T;
  } catch (error: any) {
    console.warn(`[ApiClient Network Error] ${url}:`, error.message || error);
    return {
      success: false,
      message: error.message || 'Network request failed. Operating in offline mode.',
      isOffline: true,
    } as T;
  }
}
