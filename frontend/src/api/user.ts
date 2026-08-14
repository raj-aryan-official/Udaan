/**
 * User Profile API Client
 * Udaan — Rural Education Platform
 */

import apiRequest from './client';

export interface UserProfile {
  id: string;
  name: string;
  fullName?: string;
  mobile?: string;
  role: 'student' | 'teacher' | 'guest';
  grade?: string | number;
  gradeBand?: string;
  schoolName?: string;
  avatarUrl?: string;
  avatar?: string;
  isGuest?: boolean;
  createdAt?: string;
}

export async function getProfileApi(): Promise<{ user: UserProfile }> {
  return apiRequest<{ user: UserProfile }>('/users/me', {
    method: 'GET',
  });
}

export async function updateProfileApi(data: Partial<UserProfile>): Promise<{ user: UserProfile; message?: string }> {
  return apiRequest<{ user: UserProfile; message?: string }>('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}
