import { ContentItem, ActivityCompletionPayload, RewardBase } from '../../types/learning';
import { lessonApi } from '../../services/api/lessonApi';
import { GamificationProfile } from '../../types/rewards';

export interface LearningState {
  contents: ContentItem[];
  activeContent: ContentItem | null;
  isLoading: boolean;
  error: string | null;
  lastRewardsEarned: RewardBase | null;
}

export const initialLearningState: LearningState = {
  contents: [],
  activeContent: null,
  isLoading: false,
  error: null,
  lastRewardsEarned: null,
};

export const createLearningActions = (
  state: LearningState,
  setState: React.Dispatch<React.SetStateAction<LearningState>>,
  updateRewardsProfile?: (profile: GamificationProfile) => void
) => ({
  fetchContents: async (params?: { grade?: string; gradeBand?: string; subject?: string; type?: string }) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await lessonApi.getContent(params);
    if (res.success && Array.isArray(res.content)) {
      const contentList: ContentItem[] = res.content || [];
      setState((prev) => ({
        ...prev,
        contents: contentList,
        isLoading: false,
        error: null,
      }));
      return { success: true, content: contentList };
    } else {
      setState((prev) => ({ ...prev, isLoading: false, error: res.message || 'Failed to fetch content' }));
      return { success: false, message: res.message };
    }
  },

  fetchContentById: async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await lessonApi.getContentById(id);
    if (res.success && res.content) {
      const activeItem: ContentItem = res.content;
      setState((prev) => ({
        ...prev,
        activeContent: activeItem,
        isLoading: false,
        error: null,
      }));
      return { success: true, content: activeItem };
    } else {
      setState((prev) => ({ ...prev, isLoading: false, error: res.message || 'Content not found' }));
      return { success: false, message: res.message };
    }
  },

  completeActivity: async (activityId: string, payload: ActivityCompletionPayload = {}) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await lessonApi.completeActivity(activityId, payload);
    if (res.success) {
      if (res.profile && updateRewardsProfile) {
        updateRewardsProfile(res.profile);
      }
      const earned = res.rewardsEarned || { stars: 10, coins: 5, xp: 20 };
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
        lastRewardsEarned: earned,
        contents: prev.contents.map((item) =>
          item.id === activityId ? { ...item, isCompleted: true } : item
        ),
      }));
      return { success: true, rewardsEarned: earned, profile: res.profile };
    } else {
      const fallbackRewards: RewardBase = { stars: 10, coins: 5, xp: 15 };
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
        lastRewardsEarned: fallbackRewards,
      }));
      return { success: true, rewardsEarned: fallbackRewards };
    }
  },
});
