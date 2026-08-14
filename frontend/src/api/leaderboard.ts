/**
 * Privacy-Isolated Scoped Leaderboard API Client (Class & School)
 * Udaan — Rural Education Platform
 */

import apiRequest from './client';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl?: string;
  stars: number;
  xp?: number;
  streak: number;
  isCurrentUser: boolean;
}

export type LeaderboardScope = 'class' | 'school';
export type LeaderboardType = 'top' | 'improved' | 'consistent' | 'quiz';

export async function getLeaderboardApi(
  scope: LeaderboardScope = 'class',
  type: LeaderboardType = 'top'
): Promise<{ scope: string; type: string; rankings: LeaderboardEntry[] }> {
  return apiRequest<{ scope: string; type: string; rankings: LeaderboardEntry[] }>(
    `/leaderboard?scope=${scope}&type=${type}`,
    {
      method: 'GET',
    }
  );
}
