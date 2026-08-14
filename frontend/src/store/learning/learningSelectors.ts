import { LearningState } from './learningSlice';

export const selectContents = (state: LearningState) => state.contents;
export const selectActiveContent = (state: LearningState) => state.activeContent;
export const selectLearningLoading = (state: LearningState) => state.isLoading;
export const selectLastRewardsEarned = (state: LearningState) => state.lastRewardsEarned;
