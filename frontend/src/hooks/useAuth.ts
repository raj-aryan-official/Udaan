/**
 * Custom hook for Auth state and actions
 * Udaan — Rural Education Platform
 */

import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
