import { RewardsState } from './rewardsSlice';

export const selectGamificationProfile = (state: RewardsState) => state.profile;
export const selectStars = (state: RewardsState) => state.profile?.stars ?? 0;
export const selectCoins = (state: RewardsState) => state.profile?.coins ?? 0;
export const selectXP = (state: RewardsState) => state.profile?.xp ?? 0;
export const selectBadges = (state: RewardsState) => state.badges;
export const selectMissions = (state: RewardsState) => state.missions;
export const selectLeaderboard = (state: RewardsState) => state.leaderboard;
export const selectCertificates = (state: RewardsState) => state.certificates;
export const selectRewardsLoading = (state: RewardsState) => state.isLoading;
