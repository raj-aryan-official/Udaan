export type UserRole = 'student' | 'teacher' | 'guest';

export interface AuthUser {
  id: string;
  role: UserRole;
  name: string;
  mobileNumber?: string;
  grade?: string;
  gradeBand?: string;
  schoolCode?: string;
  assignedGrades?: string[];
  isGuest: boolean;
  avatar?: string;
  expiresAt?: string;
}

export interface LoginCredentials {
  mobileNumber: string;
  pin: string;
}

export interface RegisterCredentials {
  mobileNumber: string;
  pin: string;
  role?: UserRole;
  name: string;
  grade?: string;
  schoolCode?: string;
  assignedGrades?: string[];
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
}

export interface PinResetRequest {
  mobileNumber: string;
}

export interface PinResetVerify {
  mobileNumber: string;
  otp: string;
  newPin: string;
}

export interface GuestConvertPayload {
  mobileNumber: string;
  pin: string;
  name: string;
  role?: UserRole;
  grade?: string;
  schoolCode?: string;
  assignedGrades?: string[];
}
