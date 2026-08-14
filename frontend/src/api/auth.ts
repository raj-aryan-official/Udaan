/**
 * Authentication Endpoints API Client
 * Udaan — Rural Education Platform
 */

import apiRequest from './client';

export interface RegisterPayload {
  name?: string;
  fullName?: string;
  mobile?: string;
  mobileNumber?: string;
  pin: string;
  role?: 'student' | 'teacher';
  grade?: string | number;
  schoolName?: string;
}

export interface LoginPayload {
  mobile?: string;
  mobileNumber?: string;
  pin: string;
}

export interface ConvertGuestPayload {
  name?: string;
  fullName?: string;
  mobile?: string;
  mobileNumber?: string;
  pin: string;
  grade?: string | number;
  schoolName?: string;
}

export interface AuthResponse {
  message?: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    fullName?: string;
    mobile?: string;
    role: string;
    grade?: string | number;
    gradeBand?: string;
    schoolName?: string;
    avatarUrl?: string;
    avatar?: string;
    isGuest?: boolean;
  };
}

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      mobile: payload.mobile || payload.mobileNumber,
      pin: payload.pin,
    }),
  });
}

export async function registerApi(payload: RegisterPayload): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name || payload.fullName,
      mobile: payload.mobile || payload.mobileNumber,
      pin: payload.pin,
      role: payload.role,
      grade: payload.grade,
      schoolName: payload.schoolName,
    }),
  });
}

export async function guestApi(): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/guest', {
    method: 'POST',
  });
}

export async function refreshTokenApi(refreshToken: string): Promise<{ accessToken: string }> {
  return apiRequest<{ accessToken: string }>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}

export async function requestPinResetOtpApi(mobile: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/auth/pin-reset/request-otp', {
    method: 'POST',
    body: JSON.stringify({ mobile }),
  });
}

export const requestPinResetApi = requestPinResetOtpApi;

export async function verifyPinResetOtpApi(mobile: string, otp: string, newPin: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/auth/pin-reset/verify', {
    method: 'POST',
    body: JSON.stringify({ mobile, otp, newPin }),
  });
}

export async function convertGuestApi(payload: ConvertGuestPayload): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/convert-guest', {
    method: 'POST',
    body: JSON.stringify({
      name: payload.name || payload.fullName,
      mobile: payload.mobile || payload.mobileNumber,
      pin: payload.pin,
      grade: payload.grade,
      schoolName: payload.schoolName,
    }),
  });
}
