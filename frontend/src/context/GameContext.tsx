/**
 * Global Gamification & Learning Context
 * Manages Stars, Coins, XP, Level, Streaks, Plant Garden stage, and Pet Mood state
 * Udaan — Rural Education Platform
 */

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { STORAGE_KEYS } from '../config/constants';
import storage from '../services/storage';
import { getGamificationStateApi, completeActivityApi, ActivityCompletionResponse } from '../api/gamification';

export interface GameContextType {
  stars: number;
  coins: number;
  xp: number;
  level: number;
  streakDays: number;
  streak?: number;
  plantStage: 'seed' | 'sprout' | 'sapling' | 'blooming' | 'tree';
  petMood: 'happy' | 'excited' | 'sleepy' | 'hungry';
  unlockedBadges: string[];
  isLoading: boolean;
  completeActivity: (activityId: string, score: number, timeSpentSeconds: number) => Promise<ActivityCompletionResponse>;
  refreshGamificationState: () => Promise<void>;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const [stars, setStars] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [streakDays, setStreakDays] = useState<number>(1);
  const [plantStage, setPlantStage] = useState<'seed' | 'sprout' | 'sapling' | 'blooming' | 'tree'>('sprout');
  const [petMood, setPetMood] = useState<'happy' | 'excited' | 'sleepy' | 'hungry'>('happy');
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore cached gamification stats from local storage on mount
  useEffect(() => {
    async function restoreStats() {
      try {
        const storedStars = await storage.getItem(STORAGE_KEYS.STARS_COUNT);
        const storedCoins = await storage.getItem(STORAGE_KEYS.COINS_COUNT);
        const storedStreak = await storage.getItem(STORAGE_KEYS.STREAK_DAYS);
        const storedPlant = await storage.getItem(STORAGE_KEYS.PLANT_STAGE);
        const storedPet = await storage.getItem(STORAGE_KEYS.PET_MOOD);

        if (storedStars) setStars(parseInt(storedStars, 10) || 0);
        if (storedCoins) setCoins(parseInt(storedCoins, 10) || 0);
        if (storedStreak) setStreakDays(parseInt(storedStreak, 10) || 1);
        if (storedPlant) setPlantStage(storedPlant as any);
        if (storedPet) setPetMood(storedPet as any);

        // Fetch fresh stats from server
        refreshGamificationState();
      } catch (err) {
        console.warn('[GameContext] Restore stats error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    restoreStats();
  }, []);

  const refreshGamificationState = useCallback(async () => {
    try {
      const data = await getGamificationStateApi();
      if (data) {
        setStars(data.stars);
        setCoins(data.coins);
        setXp(data.xp);
        setLevel(data.level);
        setStreakDays(data.streakDays);
        setPlantStage(data.plantStage);
        setPetMood(data.petMood);
        setUnlockedBadges(data.unlockedBadges || []);

        await storage.setItem(STORAGE_KEYS.STARS_COUNT, data.stars.toString());
        await storage.setItem(STORAGE_KEYS.COINS_COUNT, data.coins.toString());
        await storage.setItem(STORAGE_KEYS.STREAK_DAYS, data.streakDays.toString());
        await storage.setItem(STORAGE_KEYS.PLANT_STAGE, data.plantStage);
        await storage.setItem(STORAGE_KEYS.PET_MOOD, data.petMood);
      }
    } catch (err) {
      console.warn('[GameContext] Refresh stats API fallback:', err);
    }
  }, []);

  const completeActivity = useCallback(
    async (activityId: string, score: number, timeSpentSeconds: number): Promise<ActivityCompletionResponse> => {
      const res = await completeActivityApi(activityId, score, timeSpentSeconds);
      if (res) {
        setStars(res.totalStars);
        setCoins(res.totalCoins);
        setXp(res.totalXp);
        setLevel(res.newLevel);
        setPlantStage(res.plantStage);
        setPetMood(res.petMood);
        if (res.newBadge) {
          setUnlockedBadges((prev) => [...prev, res.newBadge!]);
        }

        await storage.setItem(STORAGE_KEYS.STARS_COUNT, res.totalStars.toString());
        await storage.setItem(STORAGE_KEYS.COINS_COUNT, res.totalCoins.toString());
        await storage.setItem(STORAGE_KEYS.PLANT_STAGE, res.plantStage);
        await storage.setItem(STORAGE_KEYS.PET_MOOD, res.petMood);
      }
      return res;
    },
    []
  );

  return (
    <GameContext.Provider
      value={{
        stars,
        coins,
        xp,
        level,
        streakDays,
        streak: streakDays,
        plantStage,
        petMood,
        unlockedBadges,
        isLoading,
        completeActivity,
        refreshGamificationState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
