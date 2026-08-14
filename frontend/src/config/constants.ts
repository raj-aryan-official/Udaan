/**
 * Application Constants
 * Udaan — Gamified Learning Platform for Rural Education
 */

export const API_BASE_URL = 'http://localhost:5000'; // Default backend API URL

export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@udaan_access_token',
  REFRESH_TOKEN: '@udaan_refresh_token',
  USER_DATA: '@udaan_user_data',
  OFFLINE_QUEUE: '@udaan_offline_queue',
  LANGUAGE: '@udaan_language',
  VOICEOVER_ENABLED: '@udaan_voiceover_enabled',
  STARS_COUNT: '@udaan_stars_count',
  COINS_COUNT: '@udaan_coins_count',
  STREAK_DAYS: '@udaan_streak_days',
  PLANT_STAGE: '@udaan_plant_stage',
  PET_MOOD: '@udaan_pet_mood',
};

export const GRADE_BANDS = {
  NURSERY_1: 'nursery_1',
  CLASS_2_4: 'class_2_4',
  CLASS_5_8: 'class_5_8',
  CLASS_9_10: 'class_9_10',
} as const;

export type GradeBandType = typeof GRADE_BANDS[keyof typeof GRADE_BANDS];

export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  GUEST: 'guest',
} as const;

export type UserRoleType = typeof USER_ROLES[keyof typeof USER_ROLES];

export const LANGUAGES = {
  ODIA: 'or',
  ENGLISH: 'en',
} as const;

export const PLANT_STAGES = ['seed', 'sprout', 'sapling', 'bud', 'flowering_tree'] as const;
export type PlantStageType = typeof PLANT_STAGES[number];

export const PET_MOODS = ['happy', 'excited', 'sleepy', 'curious', 'playful'] as const;
export type PetMoodType = typeof PET_MOODS[number];
