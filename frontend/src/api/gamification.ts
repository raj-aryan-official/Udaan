/**
 * Gamification Engine & Rewards API Client
 * Udaan — Rural Education Platform
 */

import apiRequest from './client';

export interface GamificationProfile {
  userId: string;
  totalStars: number;
  totalCoins: number;
  totalXP: number;
  level: number;
  streakCount: number;
  lastActiveDate?: string;
  plantStage: 'seed' | 'sprout' | 'sapling' | 'blooming' | 'tree';
  petMood: 'happy' | 'excited' | 'sleepy' | 'hungry';
  unlockedBadges: Array<{
    badgeId: string;
    unlockedAt: string;
    title: string;
    description: string;
    iconUrl?: string;
  }>;
}

export interface CompleteActivityResponse {
  message: string;
  rewardsEarned: {
    starsEarned: number;
    coinsEarned: number;
    xpEarned: number;
    levelUp?: boolean;
    newLevel?: number;
    streakUpdated?: boolean;
    newPlantStage?: string;
    newPetMood?: string;
    newBadgeUnlocked?: {
      id: string;
      title: string;
      description: string;
    };
  };
  updatedGamification: GamificationProfile;
}

export interface ActivityCompletionResponse {
  totalStars: number;
  totalCoins: number;
  totalXp: number;
  newLevel: number;
  plantStage: 'seed' | 'sprout' | 'sapling' | 'blooming' | 'tree';
  petMood: 'happy' | 'excited' | 'sleepy' | 'hungry';
  newBadge?: string;
}

export interface GamificationState {
  stars: number;
  coins: number;
  xp: number;
  level: number;
  streakDays: number;
  plantStage: 'seed' | 'sprout' | 'sapling' | 'blooming' | 'tree';
  petMood: 'happy' | 'excited' | 'sleepy' | 'hungry';
  unlockedBadges: string[];
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  gradeBand?: string;
  requiredStars?: number;
}

export async function completeActivityApi(
  activityId: string,
  score: number = 100,
  timeSpentSeconds: number = 60
): Promise<ActivityCompletionResponse> {
  const res = await apiRequest<CompleteActivityResponse>(`/activities/${activityId}/complete`, {
    method: 'POST',
    body: JSON.stringify({ score, timeSpentSeconds }),
  });

  const p = res?.updatedGamification;
  return {
    totalStars: p?.totalStars || 10,
    totalCoins: p?.totalCoins || 5,
    totalXp: p?.totalXP || 20,
    newLevel: p?.level || 1,
    plantStage: (p?.plantStage as any) || 'sprout',
    petMood: (p?.petMood as any) || 'happy',
    newBadge: res?.rewardsEarned?.newBadgeUnlocked?.title,
  };
}

export async function getGamificationProfileApi(): Promise<{ profile: GamificationProfile }> {
  return apiRequest<{ profile: GamificationProfile }>('/gamification/me', {
    method: 'GET',
  });
}

export async function getGamificationStateApi(): Promise<GamificationState> {
  try {
    const res = await getGamificationProfileApi();
    const p = res?.profile;
    return {
      stars: p?.totalStars || 0,
      coins: p?.totalCoins || 0,
      xp: p?.totalXP || 0,
      level: p?.level || 1,
      streakDays: p?.streakCount || 1,
      plantStage: (p?.plantStage as any) || 'sprout',
      petMood: (p?.petMood as any) || 'happy',
      unlockedBadges: (p?.unlockedBadges || []).map((b) => b.title),
    };
  } catch {
    return {
      stars: 15,
      coins: 10,
      xp: 40,
      level: 1,
      streakDays: 2,
      plantStage: 'sprout',
      petMood: 'happy',
      unlockedBadges: ['First Step ⭐'],
    };
  }
}

export async function getBadgesApi(gradeBand?: string): Promise<{ badges: BadgeItem[] }> {
  const query = gradeBand ? `?gradeBand=${gradeBand}` : '';
  return apiRequest<{ badges: BadgeItem[] }>(`/badges${query}`, {
    method: 'GET',
  });
}
