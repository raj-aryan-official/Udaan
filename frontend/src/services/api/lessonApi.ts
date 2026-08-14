import { apiRequest } from './apiClient';
import {
  ContentListResponse,
  ContentDetailResponse,
  ActivityCompletionPayload,
  ActivityCompletionResponse,
} from '../../types/learning';

export const lessonApi = {
  getContent: async (params?: {
    grade?: string;
    gradeBand?: string;
    subject?: string;
    type?: string;
  }): Promise<ContentListResponse> => {
    const query = new URLSearchParams();
    if (params?.grade) query.append('grade', params.grade);
    if (params?.gradeBand) query.append('gradeBand', params.gradeBand);
    if (params?.subject) query.append('subject', params.subject);
    if (params?.type) query.append('type', params.type);

    const queryString = query.toString();
    const endpoint = `/content${queryString ? `?${queryString}` : ''}`;
    return apiRequest<ContentListResponse>(endpoint, {
      method: 'GET',
    });
  },

  getContentById: async (id: string): Promise<ContentDetailResponse> => {
    return apiRequest<ContentDetailResponse>(`/content/${id}`, {
      method: 'GET',
    });
  },

  completeActivity: async (
    activityId: string,
    payload: ActivityCompletionPayload = {}
  ): Promise<ActivityCompletionResponse> => {
    return apiRequest<ActivityCompletionResponse>(`/activities/${activityId}/complete`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
