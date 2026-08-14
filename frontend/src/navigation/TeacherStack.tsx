/**
 * Teacher Sub-Stack Navigator Component
 * Navigation stack between Teacher Home, Class Progress & Assign Mission screens
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import TeacherHomeScreen from '../screens/teacher/TeacherHomeScreen';
import ClassProgressScreen from '../screens/teacher/ClassProgressScreen';
import AssignMissionScreen from '../screens/teacher/AssignMissionScreen';

export const TeacherStack: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'progress' | 'assign'>('home');

  switch (screen) {
    case 'progress':
      return <ClassProgressScreen onBack={() => setScreen('home')} />;
    case 'assign':
      return <AssignMissionScreen onBack={() => setScreen('home')} />;
    case 'home':
    default:
      return (
        <TeacherHomeScreen
          onNavigateClassProgress={() => setScreen('progress')}
          onNavigateAssignMission={() => setScreen('assign')}
          onLogout={() => setScreen('home')}
        />
      );
  }
};

export default TeacherStack;
