/**
 * Custom hook for Gamification profile and reward triggers
 * Udaan — Rural Education Platform
 */

import { useContext } from 'react';
import { GameContext, GameContextType } from '../context/GameContext';

export function useGamification(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGamification must be used within a GameProvider');
  }
  return context;
}

export default useGamification;
