/**
 * Authentication Navigation Stack Component
 * Navigation stack between Welcome, Login, Register & PIN Reset screens
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import PinResetScreen from '../screens/auth/PinResetScreen';

export const AuthStack: React.FC = () => {
  const [screen, setScreen] = useState<'welcome' | 'login' | 'register' | 'pin_reset'>('welcome');

  switch (screen) {
    case 'login':
      return (
        <LoginScreen
          onNavigateRegister={() => setScreen('register')}
          onNavigatePinReset={() => setScreen('pin_reset')}
          onBack={() => setScreen('welcome')}
        />
      );
    case 'register':
      return (
        <RegisterScreen
          onNavigateLogin={() => setScreen('login')}
          onBack={() => setScreen('welcome')}
        />
      );
    case 'pin_reset':
      return (
        <PinResetScreen
          onBack={() => setScreen('login')}
          onResetSuccess={() => setScreen('login')}
        />
      );
    case 'welcome':
    default:
      return (
        <WelcomeScreen
          onNavigateLogin={() => setScreen('login')}
          onNavigateRegister={() => setScreen('register')}
        />
      );
  }
};

export default AuthStack;
