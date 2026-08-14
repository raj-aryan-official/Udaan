/**
 * User Profile & Account Settings Screen
 * Udaan — Rural Education Platform
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StarCounter from '../../components/gamification/StarCounter';
import CoinCounter from '../../components/gamification/CoinCounter';
import { colors, layout, typography, spacing } from '../../config/theme';
import useAuth from '../../hooks/useAuth';
import useGamification from '../../hooks/useGamification';

export interface ProfileScreenProps {
  onNavigateAvatarSelector: () => void;
  onNavigateConvertGuest: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateAvatarSelector,
  onNavigateConvertGuest,
  onLogout,
}: ProfileScreenProps) => {
  const { user, role, isGuest, logout } = useAuth();
  const { stars, coins, level, streakDays } = useGamification();

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Profile Box */}
      <Card style={styles.profileCard}>
        <Text style={styles.avatarEmoji}>{user?.avatar || '👦'}</Text>
        <Text style={styles.userName}>{user?.fullName || 'Guest Learner'}</Text>
        <Text style={styles.roleText}>
          {role.toUpperCase()} • Grade {user?.grade || 1}
        </Text>

        <Button
          title="Change Character Avatar 🎨"
          variant="outline"
          size="small"
          onPress={onNavigateAvatarSelector}
          style={styles.avatarBtn}
        />
      </Card>

      {/* Guest Warning */}
      {isGuest ? (
        <Card style={styles.guestCard} onPress={onNavigateConvertGuest}>
          <Text style={styles.guestTitle}>⚠️ Temporary Guest Account</Text>
          <Text style={styles.guestSub}>Link mobile number to save stars forever!</Text>
        </Card>
      ) : null}

      {/* Stats Summary */}
      <Text style={styles.sectionTitle}>Learning Stats 📊</Text>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Stars</Text>
          <StarCounter count={stars} />
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Coins</Text>
          <CoinCounter count={coins} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Current Level</Text>
          <Text style={styles.statVal}>⚡ Level {level}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Daily Streak</Text>
          <Text style={styles.statVal}>🔥 {streakDays} Days</Text>
        </View>
      </View>

      {/* Logout */}
      <Button
        title="Logout / Switch User 🚪"
        variant="danger"
        size="large"
        onPress={handleLogout}
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
  profileCard: {
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  avatarEmoji: {
    fontSize: 64,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  roleText: {
    fontSize: typography.fontSize.xs,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  avatarBtn: {
    paddingHorizontal: spacing.md,
  },
  guestCard: {
    backgroundColor: '#FFF3E0',
    borderColor: colors.secondary,
    borderWidth: 2,
    marginBottom: spacing.md,
  },
  guestTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: 'bold',
    color: colors.secondaryDark,
  },
  guestSub: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.cardBg,
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  statVal: {
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  logoutBtn: {
    marginTop: spacing.xl,
  },
});

export default ProfileScreen;
