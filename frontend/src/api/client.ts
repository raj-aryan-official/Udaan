/**
 * Base REST API Client with JWT & Token Refresh Interceptors
 * Udaan — Rural Education Platform
 */

import { API_BASE_URL, STORAGE_KEYS } from '../config/constants';
import storage from '../services/storage';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export class ApiError extends Error {
  public statusCode: number;
  public data: any;

  constructor(message: string, statusCode: number = 500, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Base HTTP request handler with automatic Auth header and Refresh token rotation
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const token = await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    let response = await fetch(url, config);

    // If access token expired (401), try token refresh automatically
    if (response.status === 401 && token) {
      const refreshToken = await storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            const newAccessToken = refreshData.accessToken || refreshData.data?.accessToken;
            if (newAccessToken) {
              await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
              headers['Authorization'] = `Bearer ${newAccessToken}`;
              response = await fetch(url, { ...config, headers });
            }
          } else {
            // Refresh token failed -> clear session
            await storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
            await storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          }
        } catch {
          // Token refresh network error
        }
      }
    }

    const contentType = response.headers.get('content-type');
    let data: any = {};
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (!response.ok) {
      const errorMessage = data.message || data.error || `HTTP ${response.status} Error`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data as T;
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(err.message || 'Network request failed. Please check internet connection.', 0);
  }
}

export default apiRequest;
