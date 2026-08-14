/**
 * Grade Band Rules & Feature Unlock Engine
 * Udaan — Rural Education Platform
 */

import { GRADE_BANDS, GradeBandType } from './constants';

export interface GradeBandConfig {
  id: GradeBandType;
  name: string;
  gradesIncluded: string[];
  enabledFeatures: {
    stars: boolean;
    coins: boolean;
    xp: boolean;
    level: boolean;
    streaks: boolean;
    badges: boolean;
    plantGrowth: boolean;
    petMood: boolean;
    celebrationModal: boolean;
    dailyMissions: boolean;
    weeklyMissions: boolean;
    leaderboards: boolean;
    certificates: boolean;
    avatarUnlocks: boolean;
    voiceoverByDefault: boolean;
    bigIconUI: boolean;
  };
}

export const GRADE_BAND_CONFIGS: Record<GradeBandType, GradeBandConfig> = {
  [GRADE_BANDS.NURSERY_1]: {
    id: GRADE_BANDS.NURSERY_1,
    name: 'Early Childhood (Nursery - Class 1)',
    gradesIncluded: ['Nursery', 'LKG', 'UKG', '1'],
    enabledFeatures: {
      stars: true,
      coins: false,
      xp: false,
      level: false,
      streaks: false,
      badges: true,
      plantGrowth: true,
      petMood: true,
      celebrationModal: true,
      dailyMissions: false,
      weeklyMissions: false,
      leaderboards: false,
      certificates: false,
      avatarUnlocks: false,
      voiceoverByDefault: true,
      bigIconUI: true,
    },
  },
  [GRADE_BANDS.CLASS_2_4]: {
    id: GRADE_BANDS.CLASS_2_4,
    name: 'Primary (Class 2 - 4)',
    gradesIncluded: ['2', '3', '4'],
    enabledFeatures: {
      stars: true,
      coins: true,
      xp: false,
      level: false,
      streaks: true,
      badges: true,
      plantGrowth: false,
      petMood: false,
      celebrationModal: true,
      dailyMissions: true,
      weeklyMissions: false,
      leaderboards: false,
      certificates: false,
      avatarUnlocks: true,
      voiceoverByDefault: false,
      bigIconUI: false,
    },
  },
  [GRADE_BANDS.CLASS_5_8]: {
    id: GRADE_BANDS.CLASS_5_8,
    name: 'Upper Primary (Class 5 - 8)',
    gradesIncluded: ['5', '6', '7', '8'],
    enabledFeatures: {
      stars: true,
      coins: true,
      xp: true,
      level: true,
      streaks: true,
      badges: true,
      plantGrowth: false,
      petMood: false,
      celebrationModal: false,
      dailyMissions: true,
      weeklyMissions: true,
      leaderboards: true,
      certificates: false,
      avatarUnlocks: true,
      voiceoverByDefault: false,
      bigIconUI: false,
    },
  },
  [GRADE_BANDS.CLASS_9_10]: {
    id: GRADE_BANDS.CLASS_9_10,
    name: 'Secondary (Class 9 - 10)',
    gradesIncluded: ['9', '10'],
    enabledFeatures: {
      stars: true,
      coins: false,
      xp: true,
      level: true,
      streaks: true,
      badges: true,
      plantGrowth: false,
      petMood: false,
      celebrationModal: false,
      dailyMissions: true,
      weeklyMissions: true,
      leaderboards: true,
      certificates: true,
      avatarUnlocks: true,
      voiceoverByDefault: false,
      bigIconUI: false,
    },
  },
};

/**
 * Resolves grade string into matching GradeBandType
 */
export function getGradeBandFromGrade(grade?: string | number): GradeBandType {
  if (grade === undefined || grade === null) return GRADE_BANDS.NURSERY_1;
  const g = grade.toString().toLowerCase().trim();
  if (['nursery', 'lkg', 'ukg', '1'].includes(g)) return GRADE_BANDS.NURSERY_1;
  if (['2', '3', '4'].includes(g)) return GRADE_BANDS.CLASS_2_4;
  if (['5', '6', '7', '8'].includes(g)) return GRADE_BANDS.CLASS_5_8;
  if (['9', '10'].includes(g)) return GRADE_BANDS.CLASS_9_10;
  return GRADE_BANDS.CLASS_5_8;
}

/**
 * Checks if a specific feature is enabled for given grade
 */
export function isFeatureEnabled(grade: string | number | undefined, feature: keyof GradeBandConfig['enabledFeatures']): boolean {
  const band = getGradeBandFromGrade(grade);
  return GRADE_BAND_CONFIGS[band].enabledFeatures[feature];
}
