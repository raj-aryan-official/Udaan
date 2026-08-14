import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { AuthState, initialAuthState, createAuthActions } from './auth/authSlice';
import { StudentState, initialStudentState, createStudentActions } from './student/studentSlice';
import { LearningState, initialLearningState, createLearningActions } from './learning/learningSlice';
import { RewardsState, initialRewardsState, createRewardsActions } from './rewards/rewardsSlice';
import { GamificationProfile } from '../types/rewards';

export interface StoreContextType {
  auth: AuthState & ReturnType<typeof createAuthActions>;
  student: StudentState & ReturnType<typeof createStudentActions>;
  learning: LearningState & ReturnType<typeof createLearningActions>;
  rewards: RewardsState & ReturnType<typeof createRewardsActions>;
}

const StoreContext = createContext<StoreContextType | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [studentState, setStudentState] = useState<StudentState>(initialStudentState);
  const [learningState, setLearningState] = useState<LearningState>(initialLearningState);
  const [rewardsState, setRewardsState] = useState<RewardsState>(initialRewardsState);

  const updateRewardsProfile = (profile: GamificationProfile) => {
    setRewardsState((prev) => ({ ...prev, profile }));
  };

  const authActions = useMemo(() => createAuthActions(authState, setAuthState), [authState]);
  const studentActions = useMemo(() => createStudentActions(studentState, setStudentState), [studentState]);
  const learningActions = useMemo(
    () => createLearningActions(learningState, setLearningState, updateRewardsProfile),
    [learningState]
  );
  const rewardsActions = useMemo(() => createRewardsActions(rewardsState, setRewardsState), [rewardsState]);

  const value: StoreContextType = useMemo(
    () => ({
      auth: { ...authState, ...authActions },
      student: { ...studentState, ...studentActions },
      learning: { ...learningState, ...learningActions },
      rewards: { ...rewardsState, ...rewardsActions },
    }),
    [authState, authActions, studentState, studentActions, learningState, learningActions, rewardsState, rewardsActions]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const useAuth = () => useStore().auth;
export const useStudent = () => useStore().student;
export const useLearning = () => useStore().learning;
export const useRewards = () => useStore().rewards;
