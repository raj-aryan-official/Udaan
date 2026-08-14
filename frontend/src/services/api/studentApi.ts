import { apiRequest } from './apiClient';
import { ProfileResponse, UpdateProfilePayload } from '../../types/student';

export const studentApi = {
  getProfile: async (): Promise<ProfileResponse> => {
    return apiRequest<ProfileResponse>('/users/me', {
      method: 'GET',
    });
  },

  updateProfile: async (data: UpdateProfilePayload): Promise<ProfileResponse> => {
    return apiRequest<ProfileResponse>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};
