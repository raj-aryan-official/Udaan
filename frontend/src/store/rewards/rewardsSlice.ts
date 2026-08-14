import {
  GamificationProfile,
  BadgeItem,
  MissionItem,
  LeaderboardItem,
  CertificateItem,
} from '../../types/rewards';
import { rewardsApi } from '../../services/api/rewardsApi';

export interface RewardsState {
  profile: GamificationProfile | null;
  badges: BadgeItem[];
  missions: MissionItem[];
  leaderboard: LeaderboardItem[];
  certificates: CertificateItem[];
  isLoading: boolean;
  error: string | null;
}

export const initialRewardsState: RewardsState = {
  profile: {
    userId: 'default',
    gradeBand: 'nursery_1',
    stars: 120,
    coins: 45,
    xp: 150,
    level: 1,
    streak: 3,
    badges: ['star_starter'],
    plantStage: 1,
    petMood: 'happy',
  },
  badges: [],
  missions: [],
  leaderboard: [],
  certificates: [],
  isLoading: false,
  error: null,
};

export const createRewardsActions = (
  state: RewardsState,
  setState: React.Dispatch<React.SetStateAction<RewardsState>>
) => ({
  fetchGamificationProfile: async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await rewardsApi.getGamificationProfile();
    if (res.success && res.profile) {
      setState((prev) => ({
        ...prev,
        profile: res.profile!,
        isLoading: false,
        error: null,
      }));
      return { success: true, profile: res.profile };
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, profile: state.profile };
    }
  },

  fetchBadges: async (gradeBand?: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await rewardsApi.getBadges(gradeBand);
    if (res.success && Array.isArray(res.badges)) {
      setState((prev) => ({
        ...prev,
        badges: res.badges!,
        isLoading: false,
        error: null,
      }));
      return { success: true, badges: res.badges };
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, badges: state.badges };
    }
  },

  fetchMissions: async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await rewardsApi.getActiveMissions();
    if (res.success && Array.isArray(res.missions)) {
      setState((prev) => ({
        ...prev,
        missions: res.missions!,
        isLoading: false,
        error: null,
      }));
      return { success: true, missions: res.missions };
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, missions: state.missions };
    }
  },

  fetchLeaderboard: async (params?: { scope?: 'class' | 'school'; type?: string }) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await rewardsApi.getLeaderboard(params);
    if (res.success && Array.isArray(res.leaderboard)) {
      setState((prev) => ({
        ...prev,
        leaderboard: res.leaderboard!,
        isLoading: false,
        error: null,
      }));
      return { success: true, leaderboard: res.leaderboard };
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, leaderboard: state.leaderboard };
    }
  },

  fetchCertificates: async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await rewardsApi.getCertificates();
    if (res.success && Array.isArray(res.certificates)) {
      setState((prev) => ({
        ...prev,
        certificates: res.certificates!,
        isLoading: false,
        error: null,
      }));
      return { success: true, certificates: res.certificates };
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, certificates: state.certificates };
    }
  },

  setProfile: (newProfile: GamificationProfile) => {
    setState((prev) => ({ ...prev, profile: newProfile }));
  },
});
