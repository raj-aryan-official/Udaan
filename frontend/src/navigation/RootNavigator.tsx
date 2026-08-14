/**
 * Main Application Root Navigation Router Component
 * Routes between AuthStack, StudentTabs, and TeacherStack based on user authentication state & role
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AuthStack from './AuthStack';
import StudentTabs from './StudentTabs';
import TeacherStack from './TeacherStack';
import { colors } from '../config/theme';
import useAuth from '../hooks/useAuth';

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <AuthStack />;
  }

  if (role === 'teacher') {
    return <TeacherStack />;
  }

  return <StudentTabs />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RootNavigator;
