import { apiRequest } from './apiClient';
import {
  GamificationProfile,
  BadgeItem,
  MissionItem,
  LeaderboardItem,
  CertificateItem,
  RewardsResponse,
} from '../../types/rewards';

export const rewardsApi = {
  getGamificationProfile: async (): Promise<{ success: boolean; profile?: GamificationProfile; message?: string }> => {
    return apiRequest<{ success: boolean; profile?: GamificationProfile; message?: string }>('/gamification/me', {
      method: 'GET',
    });
  },

  getBadges: async (gradeBand?: string): Promise<{ success: boolean; badges?: BadgeItem[]; message?: string }> => {
    const endpoint = `/badges${gradeBand ? `?gradeBand=${gradeBand}` : ''}`;
    return apiRequest<{ success: boolean; badges?: BadgeItem[]; message?: string }>(endpoint, {
      method: 'GET',
    });
  },

  getActiveMissions: async (): Promise<{ success: boolean; missions?: MissionItem[]; message?: string }> => {
    return apiRequest<{ success: boolean; missions?: MissionItem[]; message?: string }>('/missions/active', {
      method: 'GET',
    });
  },

  getLeaderboard: async (params?: {
    scope?: 'class' | 'school';
    type?: string;
  }): Promise<{ success: boolean; leaderboard?: LeaderboardItem[]; message?: string }> => {
    const query = new URLSearchParams();
    if (params?.scope) query.append('scope', params.scope);
    if (params?.type) query.append('type', params.type);

    const queryString = query.toString();
    const endpoint = `/leaderboard${queryString ? `?${queryString}` : ''}`;
    return apiRequest<{ success: boolean; leaderboard?: LeaderboardItem[]; message?: string }>(endpoint, {
      method: 'GET',
    });
  },

  getCertificates: async (): Promise<{ success: boolean; certificates?: CertificateItem[]; message?: string }> => {
    return apiRequest<{ success: boolean; certificates?: CertificateItem[]; message?: string }>('/certificates/me', {
      method: 'GET',
    });
  },
};
