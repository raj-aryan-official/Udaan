import { GradeBand } from './student';
import { GamificationProfile } from './rewards';

export type ContentType = 'activity' | 'lesson' | 'quiz';

export interface RewardBase {
  stars: number;
  coins: number;
  xp: number;
}

export interface ContentItem {
  id: string;
  subject: string;
  grade: string;
  gradeBand: GradeBand;
  type: ContentType;
  title: string;
  description: string;
  contentRef?: string;
  rewardBase: RewardBase;
  isCompleted?: boolean;
}

export interface ContentListResponse {
  success: boolean;
  count?: number;
  content?: ContentItem[];
  message?: string;
}

export interface ContentDetailResponse {
  success: boolean;
  content?: ContentItem;
  message?: string;
}

export interface ActivityCompletionPayload {
  score?: number;
  timeSpentSeconds?: number;
}

export interface ActivityCompletionResponse {
  success: boolean;
  rewardsEarned?: RewardBase;
  profile?: GamificationProfile;
  message?: string;
}
