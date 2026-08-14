/**
 * Virtual Nursery Sub-Stack Navigator Component
 * Navigation stack between Nursery Home, Finger Tracing & Audio Story screens
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import NurseryHomeScreen from '../screens/nursery/NurseryHomeScreen';
import FingerTracingScreen from '../screens/nursery/FingerTracingScreen';
import StoryViewerScreen from '../screens/nursery/StoryViewerScreen';

export interface NurseryStackProps {
  onBackToMainHome: () => void;
}

export const NurseryStack: React.FC<NurseryStackProps> = ({
  onBackToMainHome,
}: NurseryStackProps) => {
  const [screen, setScreen] = useState<'home' | 'tracing' | 'story'>('home');

  switch (screen) {
    case 'tracing':
      return <FingerTracingScreen onBack={() => setScreen('home')} />;
    case 'story':
      return <StoryViewerScreen onBack={() => setScreen('home')} />;
    case 'home':
    default:
      return (
        <NurseryHomeScreen
          onNavigateTracing={() => setScreen('tracing')}
          onNavigateStory={() => setScreen('story')}
          onBack={onBackToMainHome}
        />
      );
  }
};

export default NurseryStack;
