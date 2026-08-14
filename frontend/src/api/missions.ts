/**
 * Missions & Daily/Weekly Tasks API Client
 * Udaan — Rural Education Platform
 */

import apiRequest from './client';

export interface MissionItem {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
  rewardStars: number;
  rewardCoins?: number;
  type: 'daily' | 'weekly' | 'teacher_assigned';
  deadline?: string;
}

export async function getActiveMissionsApi(): Promise<{ missions: MissionItem[] }> {
  return apiRequest<{ missions: MissionItem[] }>('/missions/active', {
    method: 'GET',
  });
}
