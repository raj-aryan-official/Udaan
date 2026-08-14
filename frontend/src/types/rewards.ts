import { GradeBand } from './student';
import { RewardBase } from './learning';

export interface GamificationProfile {
  userId: string;
  gradeBand: GradeBand;
  stars: number;
  coins: number;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  plantStage: number;
  petMood: string;
}

export interface BadgeItem {
  id: string;
  code: string;
  name: string;
  icon: string;
  gradeBands: GradeBand[];
  criteria: {
    type: string;
    threshold: number;
  };
  isUnlocked?: boolean;
}

export interface MissionProgress {
  currentCount: number;
  targetCount: number;
  isCompleted: boolean;
  completedAt?: string;
}

export interface MissionItem {
  id: string;
  title: string;
  gradeBand: GradeBand;
  frequency: 'daily' | 'weekly';
  criteria: {
    subject?: string;
    targetCount: number;
  };
  bonusReward: RewardBase;
  userProgress?: MissionProgress;
}

export interface LeaderboardItem {
  userId: string;
  name: string;
  avatar?: string;
  score: number;
  rank: number;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuedAt: string;
  grade: string;
  certificateUrl?: string;
}

export interface RewardsResponse {
  success: boolean;
  profile?: GamificationProfile;
  badges?: BadgeItem[];
  missions?: MissionItem[];
  leaderboard?: LeaderboardItem[];
  certificates?: CertificateItem[];
  message?: string;
}
