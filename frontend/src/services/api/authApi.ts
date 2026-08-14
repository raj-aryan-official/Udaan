import { apiRequest, setAuthToken, setRefreshToken } from './apiClient';
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  PinResetRequest,
  PinResetVerify,
  GuestConvertPayload,
} from '../../types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.success && res.accessToken) {
      setAuthToken(res.accessToken);
      if (res.refreshToken) setRefreshToken(res.refreshToken);
    }
    return res;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const res = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.success && res.accessToken) {
      setAuthToken(res.accessToken);
      if (res.refreshToken) setRefreshToken(res.refreshToken);
    }
    return res;
  },

  guestLogin: async (grade?: string): Promise<AuthResponse> => {
    const res = await apiRequest<AuthResponse>('/auth/guest', {
      method: 'POST',
      body: JSON.stringify({ grade: grade || 'Nursery' }),
    });
    if (res.success && res.accessToken) {
      setAuthToken(res.accessToken);
      if (res.refreshToken) setRefreshToken(res.refreshToken);
    }
    return res;
  },

  refresh: async (token: string): Promise<AuthResponse> => {
    const res = await apiRequest<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: token }),
    });
    if (res.success && res.accessToken) {
      setAuthToken(res.accessToken);
    }
    return res;
  },

  requestPinResetOtp: async (data: PinResetRequest): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>('/auth/pin-reset/request-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  verifyPinReset: async (data: PinResetVerify): Promise<{ success: boolean; message: string }> => {
    return apiRequest<{ success: boolean; message: string }>('/auth/pin-reset/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  convertGuest: async (payload: GuestConvertPayload): Promise<AuthResponse> => {
    const res = await apiRequest<AuthResponse>('/auth/convert-guest', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (res.success && res.accessToken) {
      setAuthToken(res.accessToken);
      if (res.refreshToken) setRefreshToken(res.refreshToken);
    }
    return res;
  },

  logout: () => {
    setAuthToken(null);
    setRefreshToken(null);
  },
};
