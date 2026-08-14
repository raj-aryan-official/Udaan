/**
 * Student Bottom Tab Navigator Component
 * Main tab bar for Grade 1-10 students
 * Udaan — Rural Education Platform
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StudentHomeScreen from '../screens/home/StudentHomeScreen';
import ActivityListScreen from '../screens/activities/ActivityListScreen';
import LessonViewerScreen from '../screens/activities/LessonViewerScreen';
import QuizScreen from '../screens/activities/QuizScreen';
import MissionsScreen from '../screens/missions/MissionsScreen';
import LeaderboardScreen from '../screens/leaderboard/LeaderboardScreen';
import NurseryStack from './NurseryStack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CertificatesScreen from '../screens/certificates/CertificatesScreen';
import { colors, layout, typography } from '../config/theme';

export const StudentTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'learn' | 'missions' | 'ranks' | 'nursery' | 'profile'>('home');
  const [activeSubScreen, setActiveSubScreen] = useState<'main' | 'activity_list' | 'lesson' | 'quiz' | 'certificates' | 'nursery_home'>('main');
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);

  const navigateToTab = (tab: 'home' | 'learn' | 'missions' | 'ranks' | 'nursery' | 'profile') => {
    setActiveTab(tab);
    setActiveSubScreen('main');
  };

  const handleSelectActivity = (act: any) => {
    setSelectedActivity(act);
    if (act?.type === 'quiz') {
      setActiveSubScreen('quiz');
    } else {
      setActiveSubScreen('lesson');
    }
  };

  const renderContent = () => {
    if (activeSubScreen === 'quiz' && selectedActivity) {
      return (
        <QuizScreen
          activity={selectedActivity}
          onBack={() => setActiveSubScreen('activity_list')}
        />
      );
    }

    if (activeSubScreen === 'lesson' && selectedActivity) {
      return (
        <LessonViewerScreen
          activity={selectedActivity}
          onBack={() => setActiveSubScreen('activity_list')}
        />
      );
    }

    if (activeSubScreen === 'certificates') {
      return <CertificatesScreen onBack={() => setActiveSubScreen('main')} />;
    }

    switch (activeTab) {
      case 'learn':
        return (
          <ActivityListScreen
            onSelectActivity={handleSelectActivity}
            onBack={() => setActiveTab('home')}
          />
        );
      case 'missions':
        return <MissionsScreen onBack={() => setActiveTab('home')} />;
      case 'ranks':
        return <LeaderboardScreen onBack={() => setActiveTab('home')} />;
      case 'nursery':
        return <NurseryStack onBackToMainHome={() => setActiveTab('home')} />;
      case 'profile':
        return (
          <ProfileScreen
            onNavigateAvatarSelector={() => {}}
            onNavigateConvertGuest={() => {}}
            onLogout={() => {}}
          />
        );
      case 'home':
      default:
        return (
          <StudentHomeScreen
            onNavigateLearn={() => navigateToTab('learn')}
            onNavigateMissions={() => navigateToTab('missions')}
            onNavigateLeaderboard={() => navigateToTab('ranks')}
            onNavigateCertificates={() => setActiveSubScreen('certificates')}
            onNavigateNursery={() => navigateToTab('nursery')}
            onNavigateConvertGuest={() => navigateToTab('profile')}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderContent()}</View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'home' && styles.activeTabItem]}
          onPress={() => navigateToTab('home')}
        >
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.activeTabLabel]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'learn' && styles.activeTabItem]}
          onPress={() => navigateToTab('learn')}
        >
          <Text style={styles.tabIcon}>📚</Text>
          <Text style={[styles.tabLabel, activeTab === 'learn' && styles.activeTabLabel]}>
            Learn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'missions' && styles.activeTabItem]}
          onPress={() => navigateToTab('missions')}
        >
          <Text style={styles.tabIcon}>🎯</Text>
          <Text style={[styles.tabLabel, activeTab === 'missions' && styles.activeTabLabel]}>
            Missions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'ranks' && styles.activeTabItem]}
          onPress={() => navigateToTab('ranks')}
        >
          <Text style={styles.tabIcon}>🏆</Text>
          <Text style={[styles.tabLabel, activeTab === 'ranks' && styles.activeTabLabel]}>
            Ranks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'profile' && styles.activeTabItem]}
          onPress={() => navigateToTab('profile')}
        >
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.activeTabLabel]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 62,
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: layout.elevation.high,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  activeTabItem: {
    borderTopWidth: 3,
    borderTopColor: colors.primary,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default StudentTabs;
