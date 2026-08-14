/**
 * Teacher Main Dashboard Screen
 * Overview of class metrics, mission creation, and student progress tracking
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../../components/common/Card';
import BigPillButton from '../../components/common/BigPillButton';
import Button from '../../components/common/Button';
import { colors, typography, spacing } from '../../config/theme';
import useAuth from '../../hooks/useAuth';

export interface TeacherHomeScreenProps {
  onNavigateClassProgress: () => void;
  onNavigateAssignMission: () => void;
  onLogout: () => void;
}

export const TeacherHomeScreen: React.FC<TeacherHomeScreenProps> = ({
  onNavigateClassProgress,
  onNavigateAssignMission,
  onLogout,
}: TeacherHomeScreenProps) => {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Namaskar Shikshak! 🙏</Text>
        <Text style={styles.name}>{user?.fullName || 'Teacher'}</Text>
        <Text style={styles.sub}>Primary School • Class 3 & 4</Text>
      </View>

      {/* Class Overview Summary */}
      <Text style={styles.sectionTitle}>Class Overview 📊</Text>
      <View style={styles.metricsRow}>
        <Card style={styles.metricCard}>
          <Text style={styles.metricVal}>28</Text>
          <Text style={styles.metricLabel}>Total Students</Text>
        </Card>
        <Card style={styles.metricCard}>
          <Text style={styles.metricVal}>86%</Text>
          <Text style={styles.metricLabel}>Weekly Active</Text>
        </Card>
      </View>

      {/* Actions */}
      <Text style={styles.sectionTitle}>Teacher Tools 🛠️</Text>

      <BigPillButton
        title="Student Class Progress 📊"
        subTitle="Track individual stars, streaks & lessons"
        emojiIcon="📈"
        color={colors.primary}
        textColor={colors.textLight}
        onPress={onNavigateClassProgress}
      />

      <BigPillButton
        title="Assign New Homework Mission 🎯"
        subTitle="Send Odia/Math practice task to class"
        emojiIcon="📝"
        color={colors.secondary}
        textColor={colors.textLight}
        onPress={onNavigateAssignMission}
      />

      <Button
        title="Logout / Switch Account 🚪"
        variant="danger"
        size="large"
        onPress={logout}
        style={styles.logoutBtn}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  name: {
    fontSize: typography.fontSize.xl,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  sub: {
    fontSize: typography.fontSize.xs,
    color: colors.primaryDark,
    fontWeight: 'bold',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#E8F5E9',
    borderColor: colors.forestGreen,
    borderWidth: 1.5,
  },
  metricVal: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '900',
    color: colors.forestGreen,
  },
  metricLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  logoutBtn: {
    marginTop: spacing.xl,
  },
});

export default TeacherHomeScreen;
