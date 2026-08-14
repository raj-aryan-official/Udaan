/**
 * Global Authentication Context
 * Manages user token, session, role (student/teacher/guest), and profile state
 * Udaan — Rural Education Platform
 */

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { STORAGE_KEYS, GradeBandType, UserRoleType } from '../config/constants';
import { getGradeBandFromGrade } from '../config/gradeBands';
import storage from '../services/storage';
import {
  loginApi,
  registerApi,
  guestApi,
  convertGuestApi,
  LoginPayload,
  RegisterPayload,
  ConvertGuestPayload,
} from '../api/auth';
import {
  UserProfile,
  getProfileApi,
  updateProfileApi,
} from '../api/user';

export interface AuthContextType {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  role: UserRoleType;
  gradeBand: GradeBandType;
  isLoading: boolean;
  isGuest: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  loginGuest: () => Promise<void>;
  convertGuest: (payload: ConvertGuestPayload) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session from local storage on mount
  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const storedRefreshToken = await storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        const storedUser = await storage.getJSON<UserProfile>(STORAGE_KEYS.USER_DATA);

        if (storedToken && storedUser) {
          setAccessToken(storedToken);
          setRefreshToken(storedRefreshToken);
          setUser(storedUser);

          // Verify fresh profile in background
          getProfileApi()
            .then((res) => {
              if (res.user) {
                setUser(res.user);
                storage.setJSON(STORAGE_KEYS.USER_DATA, res.user);
              }
            })
            .catch(() => {});
        }
      } catch (err) {
        console.warn('[AuthContext] Session restore error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  const saveAuthSession = useCallback(async (data: { accessToken: string; refreshToken: string; user: any }) => {
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUser(data.user);

    await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
    await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
    await storage.setJSON(STORAGE_KEYS.USER_DATA, data.user);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const res = await loginApi(payload);
      await saveAuthSession(res);
    } finally {
      setIsLoading(false);
    }
  }, [saveAuthSession]);

  const register = useCallback(async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const res = await registerApi(payload);
      await saveAuthSession(res);
    } finally {
      setIsLoading(false);
    }
  }, [saveAuthSession]);

  const loginGuest = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await guestApi();
      await saveAuthSession(res);
    } finally {
      setIsLoading(false);
    }
  }, [saveAuthSession]);

  const convertGuest = useCallback(async (payload: ConvertGuestPayload) => {
    setIsLoading(true);
    try {
      const res = await convertGuestApi(payload);
      await saveAuthSession(res);
    } finally {
      setIsLoading(false);
    }
  }, [saveAuthSession]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      await storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      await storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      await storage.removeItem(STORAGE_KEYS.USER_DATA);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    const res = await updateProfileApi(data);
    if (res.user) {
      setUser(res.user);
      await storage.setJSON(STORAGE_KEYS.USER_DATA, res.user);
    }
  }, []);

  const role: UserRoleType = (user?.role as UserRoleType) || 'student';
  const gradeBand: GradeBandType = getGradeBandFromGrade(user?.grade);
  const isGuest: boolean = Boolean(user?.isGuest);
  const isAuthenticated: boolean = Boolean(accessToken && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        role,
        gradeBand,
        isLoading,
        isGuest,
        isAuthenticated,
        login,
        register,
        loginGuest,
        convertGuest,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
